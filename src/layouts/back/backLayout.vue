<template>
  <LayoutContainer id="backLayoutContainer"  :widgetConfig="configRef"
    :layoutID="layoutIDRef" @containerLoaded="loadedHandler" />
</template>

<script lang="ts">
import widgetCofig from '@/settings/widgetSetting/index';
import { defineComponent, onMounted, ref, watch } from "vue";
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
    const layoutIDRef = ref('backLayout');
    //获取服务此Layout的layoutManager
    function loadedHandler(evt: any) {
      if (evt.layoutID === layoutIDRef.value) {
        Global.Logger().info(evt, 'loadedHandler');
        //服务Cesium大屏的
        if(!Global.LayoutMap)
        {
          Global.LayoutMap=new Map<string,any>();
        }
        Global.LayoutMap.set(evt.layoutID,evt.layoutManager);
        //判断加载
        loadInitWidgets(evt.layoutManager);
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
    //必须先计算宽度
    computeLeftMenuWidth();
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
      const divElem=document.getElementById("backLayoutContainer");
      if(divElem)
      {
        H5Tool.setCssVar('--header-top-height', topheight+'px',divElem);
      }
    });


    return {
      configRef,
      layoutIDRef,
      loadedHandler
    };
  }
});
</script>

<style scoped lang="scss">

:deep(.mainContainer) {
  top: var(--header-top-height);
  left: var(--leftSideWidth);
  background-color: var(--main-bg-color);
  height: calc(100vh - var(--header-top-height) - 10px);
  width:calc(100% - var(--leftSideWidth));
  pointer-events: auto;
  overflow-y: auto;
}

:deep(.leftContainer) {
  top: var(--header-top-height);
  width:var(--leftSideWidth);
  height: unset;
  bottom: 0px;
  pointer-events: unset;
}
:deep(.topContainer) {
  height: var(--header-top-height);
  pointer-events: auto;
}
</style>
