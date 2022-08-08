<template>
  <LayoutContainer ref="backLayoutContainer" class="layoutContainerCSSVar" :widgetConfig="configRef"
    :layoutID="layoutIDRef" @containerLoaded="loadedHandler" />
</template>

<script lang="ts">
import widgetCofig from '@/settings/widgetSetting/index';
import { defineComponent, onMounted, ref, watch,computed } from "vue";
import { Global, H5Tool, LayoutContainer, LayoutManager } from 'xframelib';
import { appStore } from '@/store';
import { storeToRefs } from 'pinia';
export default defineComponent({
  name: '',
  components: {
    LayoutContainer
  },
  setup(props, { attrs, slots, emit }) {
    const configRef = ref(widgetCofig);
    const backLayoutContainer = ref();
    const layoutIDRef = ref('backLayout');
    //获取服务此Layout的layoutManager
    function loadedHandler(evt: any) {
      if (evt.layoutID === layoutIDRef.value) {
        console.log(evt, 'loadedHandler');
        //服务Cesium大屏的
        Global.BackLayoutManager = evt.layoutManager;
        //判断加载
        loadInitWidgets(Global.BackLayoutManager);
      }
    }

    const appState = appStore();
    const { leftCollapsed } = storeToRefs(appState);
    watch(() => leftCollapsed.value, () => {
      computeLeftMenuWidth();
    })

    function computeLeftMenuWidth() {
      const sideWidth = leftCollapsed.value ? appState.menuSetting?.minWidth : appState.menuSetting?.menuWidth;
      H5Tool.setCssVar('--leftSideWidth', sideWidth+'px');
    }
    function loadInitWidgets(layoutManager:LayoutManager)
    {
      const isShowFooter=appState.showFooter;
      if(isShowFooter)
      {
        //加载底部栏版权组件
        layoutManager.loadWidget('FooterCopyrightWidget')
      }
    }
    onMounted(() => {
      //是否显示头部栏
      const isShowHeader=appState.headerSetting.show;
      const topheight=isShowHeader? appState.headerSetting.height:0;
      H5Tool.setCssVar('--header-top-height', topheight+'px');
      computeLeftMenuWidth();
    });


    return {
      configRef,
      layoutIDRef,
      loadedHandler,
      backLayoutContainer
    };
  }
});
</script>

<style scoped lang="scss">

:deep(.mainContainer) {
  top: var(--header-top-height);
  left: var(--leftSideWidth);
  background-color: var(--main-bg-color);
  // height:100%;
  width: unset;
  right: 0px;
    pointer-events: auto;
}

:deep(.leftContainer) {
  top: var(--header-top-height);
  height: unset;
  bottom: 0px;
  pointer-events: unset;
}
:deep(.topContainer) {
  height: var(--header-top-height);
  pointer-events: auto;
}
</style>
