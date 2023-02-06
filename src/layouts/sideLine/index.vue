<template>
  <a-layout class="layout">
    <a-layout-sider class="layout-sider" width="70px">
      <left-menu></left-menu>
    </a-layout-sider>
    <a-layout>
      <splitpanes
        :horizontal="false"
        class="default-theme"
        @resize="paneResizeHanlder"
      >
        <pane :size="paneSize" minSize="30" maxSize="60">
          <a-layout-content class="layout-content">
            <view-header :title="rTitle" />
            <div class="viewlayout">
              <router-view />
            </div>
          </a-layout-content>
        </pane>
        <pane :size="100 - paneSize">
          <a-layout-content class="layout-content">
            <!-- <map-view /> -->
            地图页面
          </a-layout-content>
        </pane>
      </splitpanes>
    </a-layout>
  </a-layout>
  <ModalContainerWidget />
</template>
<script lang="ts">
import { RouterTransition } from "@/components/transition";
import { appStore } from "@/store";

import { Layout } from "ant-design-vue";
import { defineComponent, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Global, H5Tool, Pane, Splitpanes } from "xframelib";
import LeftMenu from "./menu/leftmenu.vue";
import ModalContainerWidget from "@/widgets/layouts/ModalContainerWidget.vue";
import { EmitMsg } from "@/events";
export default defineComponent({
  components: {
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Header.name]: Layout.Header,
    LeftMenu,
    RouterTransition,
    Splitpanes,
    Pane,
    ModalContainerWidget,
  },
  setup() {
    const appState = appStore();
    //WM:存储主要布局
    Global.Layout = {
      paneSize: appState.paneScaleSize ?? 40,
      siderSize: 70,
    };
    const paneSize = ref<number>(Global.Layout.paneSize);
    const route = useRoute();
    const rTitle = ref(route.meta.title as string);
    watch(
      () => route.name,
      (newValue) => {
        if (newValue === "codeview") {
          paneSize.value = 50;
          Global.Layout.paneSize = 50;
          H5Tool.dispatchWindowResize();
        } else {
          paneSize.value = 30;
          Global.Layout.paneSize = 30;
          H5Tool.dispatchWindowResize();
        }
        if (newValue != "layers") {
          //关闭样式配置面板
          // EmitMsg(SystemsEvent.System_stylePanelVisible, false);
        }
        rTitle.value = route.meta.title as string;
      },
      {
        immediate: true,
      }
    );
    function paneResizeHanlder(evt) {
      Global.Layout.paneSize = evt[0].size;
      EmitMsg("PaneResize", evt);
    }
    onMounted(() => {
      rTitle.value = route.meta.title as string;
    });
    return {
      rTitle,
      paneSize,
      paneResizeHanlder,
    };
  },
});
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  overflow: hidden;
  height: 100vh;

  .ant-layout {
    overflow: hidden;
  }

  .layout-content {
    flex: none;
    padding: 0 2px;
    width: 100%;
    background: #f3f3f3;
  }

  .viewlayout {
    width: 100%;
    //height: 94%; /* 写给不支持calc()的浏览器*/
    height: -moz-calc(100vh - 55px);
    height: -webkit-calc(100vh - 55px);
    height: calc(100vh - 55px);
    // overflow-y: auto;
    // overflow-x: hidden;
    background: #f9f9f9;
  }
}

.site-layout-background {
  background: #fff;
}

:deep(.ant-menu) {
  background: transparent;
}

:deep(.ant-menu-item-selected) {
  color: #ffffff !important;
  font-weight: normal;
  background-color: #011e4b !important;
}

:deep(.ant-menu-title-content) {
  margin-left: -9px !important;
}

:deep(.iconify) {
  color: #fff;
}
</style>
