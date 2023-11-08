<template>
  <div class="topHeaderWidget ">
    <div class="centerTitle" @click="goBackHome">
      <span v-if="iscenterTitle">{{ siteTitle }}</span>
      <div class="title">Worldwide Coordinate Systems Online Service</div>
    </div>
    <div class="right-options">
        <!-- <span>
          <Icon v-if="showCollapseIcon"
            :icon="leftCollapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'"
            @click="toggleCollapse" />
        </span> -->
        <FullScreen :target="fullScreenElem" v-if="showFullScreen" />
         <a @click="loginBack" style="font-size:12px;color:#888" v-if="!isNOLogin">管理端</a>
        <a-popover>
          <template #content v-if="isNOLogin">
            <ul>
              <li>
                <a @click.prevent="showUserModal">
                  <Icon icon="ant-design:info-circle-outlined" />修改密码
                </a>
              </li>
              <li>
                <a @click.prevent="doLogout">
                  <Icon icon="ant-design:logout-outlined" />退出登录
                </a>
              </li>
            </ul>
          </template>
          <div v-if="isNOLogin" @click="loginBack">
            <Icon icon="ant-design:user-outlined" style="margin:0 5px;" v-if="isNOLogin" />{{ roleRef }}
          </div>
        </a-popover>
    </div>
    
      <ul class="rightmenu">
        <li><a href="/#/epsg/4326" :style="getRightStyle('epsg-info')">EPSG详情</a></li>
        <li><a href="/#/index" :style="getRightStyle('transform')">坐标转换</a> </li>
        <li><a href="/#/api" :style="getRightStyle('api')">API接口</a> </li>
      </ul>
  </div>
</template>

<script lang="ts">
import FullScreen from '@/components/FullScreen.vue';
import { appStore, userStore } from '@/store';
import LayoutTool from '@/utils/layoutTool';
import { doLoadModal } from '@/utils/WidgetsTool';
import { Modal } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, reactive, ref, toRefs,watch } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { Global } from "xframelib";
export default defineComponent({
  name: "HeaderTitleWidget",
  components: { FullScreen },
  setup() {
    const siteTitle = ref(Global.Config.UI?.SiteTitle);
    const appState = appStore();
    const userState = userStore();
    const { leftCollapsed } = storeToRefs(appState);
    //居中显示标题
    const iscenterTitle = ref(appState.headerSetting.centerTitle);
    //全屏图标
    const showFullScreen = ref(appState.headerSetting.showFullScreen)
    const showCollapseIcon = ref(appState.headerSetting.showCollapseIcon)

    function toggleCollapse() {
      appState.toggleCollapse();
    }
    const roleRef = computed(() => {
      return userState.name; //+ '[' + userState.DefaultMaxRole + ']';

    });
    const state = reactive({
      //头部高度
      headerHeight: LayoutTool.getHeaderHeight()
    });
    const fullScreenElem = ref(window.document.documentElement);
    const route = useRoute();
    const router=useRouter();
    const nameRef=ref(route.name);
    watch(()=>route.name,val=>{
      if(val)
      nameRef.value=val.toString();
    });
    function getRightStyle(pathName:string):string
    {
        return nameRef.value===pathName?'border-bottom:solid 3px #33f':'border-bottom:unset;';
    }
    // 退出登录
    const doLogout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        onOk: () => {
          //退出登录
          userState.clear();
          Global.Message?.msg('成功退出登录');
          window.open(window.location.pathname, '_self');
        }
      });
    };

    const isNOLogin = computed(() =>
    !Global.Config.UI?.IsNoLogin&&userState.name );
    //修改密码框
    function showUserModal() {
      const rowData = undefined;
      const modalData = {
        modalID: 'changeMyPWD',
        extraData: {
          title: '修改密码',
        },
        width: 500,
        rowData
      };
      doLoadModal(modalData);
    }
    function loginBack()
    {
      router.push({
        path: '/back'
      });
    }
    function goBackHome()
    {
      router.push({
        path: '/'
      });
    }

    return {
      ...toRefs(state),
      doLogout,
      route,
      isNOLogin,
      fullScreenElem,
      roleRef,
      showUserModal,
      leftCollapsed,
      toggleCollapse,
      siteTitle,
      iscenterTitle,
      showFullScreen,
      showCollapseIcon,
      loginBack,
      goBackHome,
      nameRef,
      getRightStyle
    };
  },
});
</script>

<style lang="scss" scoped>
.topHeaderWidget {
  position: relative;
  width: 100%;
  height: var(--header-top-height);
  // background-color: var(--header-bg-color);
}

.centerTitle {
  font-size: 28px;
  font-weight: 700;
  width: 100%;
  // line-height: var(--header-top-height);
  text-align: center;
  color: var(--header-title-color);
}

.title {
  width: 100%;
  height: 6%;
  font-size: 1vmax;
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-options {
  position: absolute;
  top:20px;
  right:5px;
  display: flex;
  align-items: center;
  justify-content:center;
  width: 8%;
  min-width:95px;
  height:var(--header-top-height);
}
.rightmenu
{
  position: absolute;
  top:20px;
  right:10%;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: space-between;
  width:25%;
  max-width:300px;
  height:var(--header-top-height);
}
</style>
