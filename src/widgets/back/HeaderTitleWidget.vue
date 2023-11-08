<template>
  <div class="topHeaderWidget clearfix">
    <div class="centerTitle">
      <!-- <span v-if="iscenterTitle">{{ siteTitle }}</span>  -->
    </div>
    <div class="fr">
      <div class="right-options">
        <span>
          <Icon v-if="showCollapseIcon"
            :icon="leftCollapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'"
            @click="toggleCollapse" />
        </span>
        <FullScreen :target="fullScreenElem" v-if="showFullScreen" />

        <a-popover>
          <template #content v-if="isNOLogin">
            <ul>
              <li class="outlist">
                <a @click.prevent="showUserModal">
                  <Icon icon="ant-design:info-circle-outlined" />
                  <span> 修改密码</span>
                </a>

              </li>
              <li class="outlist">
                <a @click.prevent="doLogout">
                  <Icon icon="ant-design:logout-outlined" />
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </template>
          <span v-if="isNOLogin">
            <Icon icon="ant-design:user-outlined" style="margin-right:5px;" v-if="isNOLogin" />{{ roleRef }}
          </span>
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
import { Modal } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { Global } from "xframelib";
export default defineComponent({
  name: "HeaderTitleWidget",
  components: {FullScreen },
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
.topHeaderWidget {
  position: relative;
  width: 100%;
  height: var(--header-top-height);
  background-color: var(--header-bg-color);
}

.centerTitle {
  font-size: 28px;
  font-weight: 700;
  width: 100%;
  line-height: var(--header-top-height);
  text-align: center;
  color: var(--header-title-color);
  // background-color: #f00;
}

.right-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;
  height: var(--header-top-height);
  padding-right:20px;
  // line-height: var(--header-top-height);
}

.outlist {
  position: relative;
  line-height: 25px;
  margin-top: 5px;
  a {
    display: flex;
    width: 85px;
    align-items: center;
    justify-content: space-evenly;
    vertical-align: middle;
    &:hover:before,
    &:hover:after {
      width: 100%;
      transition: 800ms ease all
    }
  }

  a:before,
  a:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 1px;
    width: 0;
    background: #028da9;
    transition: 400ms ease all
  }
}
</style>
