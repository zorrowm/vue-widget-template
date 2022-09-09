<template>
<div class="topHeaderWidget clearfix">
    <div class="centerTitle">
     <span v-if="iscenterTitle">{{ siteTitle }}</span> 
    </div>
    <div class="fr" style="position:relative;height:100%">
      <div class="right-options">
     <span> 
      <Icon v-if="showCollapseIcon" :icon="leftCollapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'" @click="toggleCollapse" />
     </span>
      <FullScreen :target="fullScreenElem" v-if="showFullScreen" />
      
      <a-popover>
        <template #content v-if="isNOLogin">
          <ul>
           <li >
              <a @click.prevent="showUserModal">
              <Icon icon="ant-design:info-circle-outlined"/>
              修改密码 </a>
            </li>
            <li>
              <a @click.prevent="doLogout">
              <Icon icon="ant-design:logout-outlined" />退出登录
              </a>
            </li>
          </ul>
        </template>
        <span v-if="isNOLogin"><Icon icon="ant-design:user-outlined" style="margin-right:5px;" v-if="isNOLogin"/>{{ roleRef }}</span>
      </a-popover>
    </div>
    </div>
</div>

</template>

<script lang="ts">
import FullScreen from '@/components/FullScreen.vue';
import { appStore, userStore } from '@/store';
import LayoutTool from '@/utils/layoutTool';
import { doLoadModal } from '@/utils/WidgetsTool';
import { Icon } from '@iconify/vue';
import { Modal } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { Global } from "xframelib";
export default defineComponent({
  name: "HeaderTitleWidget",
   components: { Icon, FullScreen},
  setup() {
    const siteTitle = ref(Global.Config.UI?.SiteTitle);
   const appState=appStore();
    const userState = userStore();
    const {leftCollapsed}=storeToRefs(appState);
    //居中显示标题
    const iscenterTitle=ref(appState.headerSetting.centerTitle);
    //全屏图标
    const showFullScreen=ref(appState.headerSetting.showFullScreen)
    const showCollapseIcon=ref(appState.headerSetting.showCollapseIcon)
    
    function toggleCollapse() {
      appState.toggleCollapse();
    }
    const roleRef = computed(() => {
      return userState.name + '[' + userState.DefaultMaxRole + ']';

    });
    const state = reactive({
      //头部高度
      headerHeight: LayoutTool.getHeaderHeight()
    });
   const fullScreenElem = ref(window.document.documentElement);
    const route = useRoute();
    // 退出登录
    const doLogout = () => {
      Modal.confirm({
        title: '您确定要退出登录吗？',
        onOk: () => {
          //console.log(router, '退出登录');
          //退出登录
          userState.clear();
          Global.Message?.msg('成功退出登录');
          // 移除标签页
          // localStorage.removeItem(TABS_ROUTES)
          window.open(window.location.pathname, '_self');
        }
      });
    };

    const isNOLogin = computed(() => !Global.Config.UI?.IsNoLogin);
    //修改密码框
    function showUserModal() {
      const rowData=undefined;
      const modalData={
            modalID:'changeMyPWD',
            extraData:{
                title: '修改密码', 
            },
            rowData
        };
      doLoadModal(modalData);
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
      showCollapseIcon
    };
  },
});
</script>

<style lang="scss" scoped>
.topHeaderWidget
{
  position:relative;
  width:100%;
  height: var(--header-top-height);
  background-color: var(--header-bg-color);
}

  .centerTitle
  {
    font-size: 28px;
    font-weight: 700;
    width:100%;
    line-height: var(--header-top-height);
    text-align: center;
    color: var(--header-title-color);
    // background-color: #f00;
  }

  .right-options {
    display: flex;
    align-items: center;
    justify-content:space-between;
    width: 200px;
    height:var(--header-top-height);
    // line-height: var(--header-top-height);

  }
</style>
