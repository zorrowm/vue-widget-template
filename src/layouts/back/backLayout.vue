<template>
  <LayoutContainer ref="backLayoutContainer" class="layoutContainerCSSVar" :widgetConfig="configRef"
    :layoutID="layoutIDRef" @containerLoaded="loadedHandler" />
</template>

<script lang="ts">
import widgetCofig from '@/settings/widgetSetting/index';
import { defineComponent, onMounted, ref, watch } from "vue";
import { Global, H5Tool, LayoutContainer } from 'xframelib';
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
  background-color: #0f0;
  // height:100%;
  width: unset;
  right: 0px;
}

:deep(.leftContainer) {
  top: var(--header-top-height);
  height: unset;
  bottom: 0px;
  pointer-events: unset;
}

:deep(.topContainer) {
  height: var(--header-top-height);
  pointer-events: visiblePainted;
}

.rightContainer {
  overflow: hidden;
}

.centerdiv {
  overflow: hidden;
}
</style>
