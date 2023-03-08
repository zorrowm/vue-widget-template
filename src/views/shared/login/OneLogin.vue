<template>



  <div class="container">
    <div class="login-logo">
      <img src="/img/logo.png" alt="" />
      <span class="login-title">{{ systemTitle }}</span>
    </div>
    <div class="login">

      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="扫码登录">
          <div v-if="codeName" class="box"><span>{{ codeName }}正在登录...</span></div>
          <div v-else class="box" @click="updateCode">
            <div class="imgInfo">
              <div v-if="hasUpdate && imgUrl" class="mask"><a-typography-link>点我刷新</a-typography-link></div>
              <img :src="imgUrl" alt="二维码" style="width: 100%;">

            </div>
            <span>请使用手机端扫码</span>

          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="账号登录">
          <!-- <div class="login-top">用户登录</div> -->
          <div class="box">
            <div class="login-center clearfix">
              <div class="login-center-img"><img src="/img/login/name.png" /></div>
              <div class="login-center-input">
                <input ref="nameInput" type="text" :placeholder="'请输入账号'" onfocus="this.placeholder=''" @blur="onblur()"
                  v-model="formState.username" />
                <div class="login-center-input-text">账号</div>
              </div>
            </div>
            <div class="login-center clearfix">
              <div class="login-center-img"><img src="/img/login/password.png" /></div>
              <div class="login-center-input">
                <input ref="pwdInput" type="password" :placeholder="'请输入密码'" onfocus="this.placeholder=''"
                  @blur="onblur()" v-model="formState.password" @keyup.enter="handleSubmit" />
                <div class="login-center-input-text">密码</div>
              </div>
            </div>
            <div class="login-button" @click="handleSubmit">
              登录
            </div>
          </div>

        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="login-copyright">{{ copyRightInfo }}</div>
  </div>
</template>

<script lang="ts">

// 引入


import connection from "@/utils/signalR"
import axios from "axios";



// 引入结束



import { getRightRoutes } from '@/permission';
import { userStore, loginInfoStore } from '@/store';
import { getSystemID, checkAddDefaultRoute } from '@/utils/sysTool';
import {
  checkDoRefreshToken, getLocalToken,
  getSystemRoleRight,
  Global,
  IUser,
  login,
  getRoutes,
  getRight
} from 'xframelib';
import { defineComponent, reactive, ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import doTokenCheck from '@/permission/tokenCheck';


export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: ''
    });
    const sysID = getSystemID();
    const nameInput = ref<HTMLInputElement>();
    const pwdInput = ref<HTMLInputElement>();
    const systemTitle = ref<string>('');
    systemTitle.value = Global.Config.UI?.SiteTitle;
    const copyRightInfo = ref<string>('');
    copyRightInfo.value = Global.Config.UI?.CopyRight;
    const router = useRouter();
    const route = useRoute();
    let toPath = decodeURIComponent((route.query?.redirect || '/') as string);
    //判断是否有Token
    const localToken = getLocalToken();
    let tokenValue: string | undefined;
    if (localToken) {
      checkDoRefreshToken(); //刷新KEY
      if (router)
        router.replace(toPath).then(_ => {
          if (route.name == 'login') {
            router.replace('/');
          }
        });
      return;
    }


    let canLoginClicked = true;
    const handleSubmit = async () => {
      if (!canLoginClicked) {
        Global.Logger().debug('频繁点击登录******')
        return;
      }
      canLoginClicked = false;
      if (formState.username.trim() === '' || formState.password.trim() == '') {
        setTimeout(() => {
          canLoginClicked = true;
        }, 2000);
        return Global.Message?.warn('用户名或密码不能为空！');
      }

      //编码后的
      let logindata: IUser = {
        username: formState.username.trim(),
        pwd: formState.password.trim()
      };
      //用户登录
      const data = await login(logindata).catch(ex => {
        Global.Message?.warn(`登录失败:${ex.message}!`);
        canLoginClicked = true;
      })
      if (data) {
        const userState = userStore();
        //初始化
        userState.init(data);
        //WM:全局变量，为了解决刷新浏览器路由丢失问题
        Global.User = userState.id;

        //是否是超级管理员
        const isSuperLevel = userState.DefaultMaxRoleLevel === 0;
        //获取系统角色权限
        let sysregister = true;
        const roleRight = await getSystemRoleRight(
          sysID, isSuperLevel
        ).catch(ex => {
          sysregister = false;
          Global.Message?.err('该系统未注册！')
        });
        canLoginClicked = true;
        if (!sysregister) {
          return;
        }
        Global.Logger().debug(roleRight, '登录后的系统权限')
        if (roleRight) {
          const menus = getRightRoutes();
          Global.Logger().debug(menus, '系统路由权限')
          let first: any;
          menus?.forEach(item => {
            if (!first) first = item;
            router.addRoute(item);
          });
          if (first)
            checkAddDefaultRoute(router, first)
        }
        else {
          Global.Message?.warn(formState.username + '无系统权限，无法登录！')
          return;
        }

        Global.Logger().debug(toPath, 'toPath');
        if (router) {
          if (toPath.startsWith('http://') || toPath.startsWith('https://')) {
            const localToken = getLocalToken();
            window.open(toPath + '#/?tk=' + localToken.token, '_self');
          } else {
            router.replace(toPath).then(_ => {
              if (route.name == 'login') {
                router.replace('/');
              }
            });
          }
        }
        Global.Message?.msg('登录成功');
      }
    };


    // 我写的开始
    const loginInfoState = loginInfoStore()
    let timerId: number = 0
    const baseUrl = "https://gis-auth.digsur.com"
    const apiUrl = "/api/getqrcode"
    let connId: string = ""
    let imgUrl = ref<string>("")
    let hasUpdate = ref<boolean>(false)
    let codeName = ref<string>("")
    // 计时器重新计时
    function reset() {
      Global.Logger().log("重新开始计时！！！！！")
      if (timerId) {
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => { hasUpdate.value = true }, 1000 * 60)
    }
    function init() {
      startSignalRConnection().then(_ => {
        updateCode()
        connection.on("QRCodeCheckMessage", function (uname, ischeck) {
          if (ischeck && uname) {
            codeName.value = uname
          }
          Global.Logger().log("QRCodeCheckMessage", uname, ischeck)
        })
        connection.on("QRCodeSendMessage", function (info) {
          let sendData: object = JSON.parse(info)
          Global.Logger().log("QRCodeSendMessage", sendData)
          if (sendData?.Success) {
            let token: string = sendData?.Userinfo.Doubletoken.AccessToken.TokenContent

            if (sendData.System) {
              Global.Logger().info("当前登录id", sendData.System)
              loginInfoState.info = sendData.System

            } else {
              // 没有指定就列出有权限的所有系统
              let roles: Array<object> = sendData.Userinfo?.Roles
              let result: Array<object> = []
              roles.forEach(current => {
                result.push(...(current?.Syslist))
              })
              Global.Logger().info("权限列表", result)
              loginInfoState.info = result

            }
            if (toPath.startsWith('http://') || toPath.startsWith('https://')) {
              window.open(toPath + '#/?tk=' + token, '_self');
            } else {
              router.replace('/back/scancode?tk=' + token)

            }
          } else {
            codeName.value = ""
            updateCode()
            Global.Message?.err("登录失败！请重新扫码登录")
          }

        })
      }).catch(err => { Global.Logger().error("出错了！", err) })
    }
    function updateCode() {
      if (!connId) {
        return
      }
      axios.get(baseUrl + apiUrl, { params: { connId, sys: "" }, responseType: 'blob' }).then(function (res) {
        if (hasUpdate) {
          hasUpdate.value = false
        }
        reset()
        Global.Logger().log("axios调用结果", res)
        let url = URL.createObjectURL(res.data);
        imgUrl.value = url;
      })
    }
    function startSignalRConnection() {

      return connection.start()
        .then(() => {
          Global.Logger().log("开始了")
          if (connection.state === "Connected") {
            connId = connection.connectionId
            return Promise.resolve()
          }
          Global.Logger().log("init", connection)
          return Promise.reject(connection.state)
        }).catch(err => {
          Global.Logger().error("出错了！！！", err)
          Global.Message?.err("连接出错了，请刷新当前页面重新连接！")
          throw new Error(err)
        })

    }
    onUnmounted(() => {
      Global.Logger().info("onUnmounted!!!")
      clearTimeout(timerId)
      connection.off("QRCodeCheckMessage")
      connection.off("QRCodeSendMessage")
      connection.stop()
    })
    onMounted(async () => {
      Global.Logger().info("mounted!!!")
      init();
      connection.serverTimeoutInMilliseconds = 30 * 60 * 1000;
      connection.onreconnected((connectionId?: string) => {
        Global.Logger().info("onreconnected", connectionId)
        connId = connectionId
        updateCode()

      })
      connection.onclose((error) => {
        Global.Logger().info("onclose", error)

      })
      reset()
      // 我写的结束






      tokenValue = undefined;
      if (toPath) {
        //检查是否有Token
        tokenValue = route.query?.tk?.toString();
      }
      if (tokenValue) {
        const isAvailble = await doTokenCheck(tokenValue);
        if (isAvailble) {
          const userToken = getLocalToken();
          if (userToken) {
            if (toPath?.indexOf('?') > 0) toPath += '&tk=' + userToken.token;
            else toPath += '?tk=' + userToken.token;
            router.replace(toPath).then(_ => {
              if (route.name == 'login') {
                router.replace('/');
              }
            });
          }
        }
      }
    });
    function onblur() {
      if (nameInput.value) nameInput.value.placeholder = '请输入账号';
      if (pwdInput.value) pwdInput.value.placeholder = '请输入密码';
    }
    return {
      activeKey: ref('1'),
      formState,
      systemTitle,
      handleSubmit,
      onblur,
      nameInput,
      pwdInput,
      copyRightInfo,

      // 我写的
      imgUrl,
      updateCode,
      hasUpdate,
      codeName
      // 我写的结束


    };
  }
});
</script>


<!-- 样式都是我写的！ -->
<style lang="scss" scoped>
:deep(.ant-tabs) {
  width: 100%;
  height: 100%;

  .ant-tabs-content {
    height: 100%;

  }

  .ant-tabs-nav-list {
    width: 100%;

    .ant-tabs-tab {
      flex: 1;
      justify-content: center;
    }
  }

}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}


.imgInfo {
  position: relative;

  width: 80%;

  &:hover {
    .mask {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .mask {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 24px;
    background-color: rgba($color: #fff, $alpha: .7);
  }

}
</style>