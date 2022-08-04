<template>
  <div class="container">
    <div class="login-logo">
      <img src="/img/logo.png" alt="" />
      <span class="login-title">{{ systemTitle }}</span>
    </div>
    <div class="login">
      <div class="login-top">用户登录</div>
      <div class="login-center clearfix">
        <div class="login-center-img"><img src="/img/login/name.png" /></div>
        <div class="login-center-input">
          <input ref="nameInput" type="text" :placeholder="'请输入账号'"
            onfocus="this.placeholder=''" @blur="onblur()" v-model="formState.username" />
          <div class="login-center-input-text">账号</div>
        </div>
      </div>
      <div class="login-center clearfix">
        <div class="login-center-img"><img src="/img/login/password.png" /></div>
        <div class="login-center-input">
          <input ref="pwdInput" type="password" :placeholder="'请输入密码'"
            onfocus="this.placeholder=''" @blur="onblur()" v-model="formState.password" @keyup.enter="handleSubmit" />
          <div class="login-center-input-text">密码</div>
        </div>
      </div>
      <div class="login-button" @click="handleSubmit">
        登录
      </div>
    </div>
    <div class="login-copyright">{{copyRightInfo}}</div>
  </div>
</template>

<script lang="ts">
//调试时用
import { getRightRoutes } from '@/permission';
import { userStore } from '@/store';
import { getSystemID,checkAddDefaultRoute } from '@/utils/sysTool';
import {
checkDoRefreshToken, getLocalToken,
getSystemRoleRight,
Global,
IUser,
login
} from 'xframelib';
import {defineComponent,reactive, ref,onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router';
import doTokenCheck from '@/permission/tokenCheck';

export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: ''
    });
    const nameInput = ref<HTMLInputElement>();
    const pwdInput = ref<HTMLInputElement>();
    const systemTitle = ref(Global.Config.UI?.SiteTitle);
    const copyRightInfo=ref(Global.Config.UI?.CopyRight);
    const router = useRouter();
    const route = useRoute();
    let toPath = decodeURIComponent((route.query?.redirect || '/') as string);
    //判断是否有Token
    const localToken = getLocalToken();
    let tokenValue: string | undefined;
    if (localToken) {
      checkDoRefreshToken(localToken); //刷新KEY
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
        console.log('频繁点击登录******')
        return;
      }
      canLoginClicked = false;
      if (formState.username.trim() === '' || formState.password.trim() == '')
      {
        setTimeout(() => {
          canLoginClicked=true;
        }, 2000);
         return Global.Message?.warn('用户名或密码不能为空！');
      }
       
      //编码后的
      let logindata: IUser = {
        username: formState.username.trim(),
        pwd:formState.password.trim()
      };
      //用户登录
      const data = await login(logindata).catch(ex => {
        Global.Message?.warn(`登录失败:${ex.message}!`);
        canLoginClicked=true;
      })
      if (data) {
        const userState = userStore();
        //初始化
        userState.init(data);
        //WM:全局变量，为了解决刷新浏览器路由丢失问题
        Global.User=userState.id;
        const sysID = getSystemID();
        //是否是超级管理员
        const isSuperLevel=userState.DefaultMaxRoleLevel===0;
        //获取系统角色权限
        const roleRight = await getSystemRoleRight(
          sysID,isSuperLevel
        ).catch(ex=>{
          Global.Message?.err('该系统未注册！')
        });
        canLoginClicked = true;
        if (roleRight) {
          const menus = getRightRoutes();
          let first:any;
          menus?.forEach(item => {
            if(!first) first=item;
            router.addRoute(item);
          });
          if(first)
          checkAddDefaultRoute(router,first)
        }
        else{
          //  Global.Message?.warn('用户登录失败！') 
          return;
        }

        const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
        if (router) {
          console.log(toPath, 'toPath');
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

    onMounted(async () => {
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
      formState,
      systemTitle,
      handleSubmit,
      onblur,
      nameInput,
      pwdInput,
      copyRightInfo
    };
  }
});
</script>
