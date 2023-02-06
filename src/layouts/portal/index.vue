<template>
  <div class="container">
    <LayoutContainer :widgetConfig="configRef" :layoutID="layoutIDRef" @containerLoaded="loadedHandler" />
  </div>
</template>

<script lang="ts">
import widgetCofig from '@/settings/widgetSetting/index';
import { defineComponent, onMounted,ref } from "vue";
import { Global,LayoutContainer,H5Tool } from 'xframelib';
import { appStore } from '@/store';
export default defineComponent({
  name: 'portalLayout',
  components: {
    LayoutContainer
  },
  setup(props, { attrs, slots, emit }) {
    const configRef = ref(widgetCofig);
    const layoutIDRef = ref('portalLayout');
    //获取服务此Layout的layoutManager
    function loadedHandler(evt: any) {
      if (evt.layoutID === layoutIDRef.value) {
        Global.Logger().debug(evt, 'loadedHandler');
        //服务Cesium大屏的
        if(!Global.LayoutMap)
        {
          Global.LayoutMap=new Map<string,any>();
        }
        Global.LayoutMap.set(evt.layoutID,evt.layoutManager);;
      }
    }
    const appState = appStore();
    onMounted(() => {
      //是否显示头部栏
      const isShowHeader=appState.headerSetting.show;
      const topheight=isShowHeader? appState.headerSetting.height:0;
      H5Tool.setCssVar('--header-top-height', topheight+'px');
    });

    return {
      configRef,
      layoutIDRef,
      loadedHandler
    };
  }
});
</script>

<style lang="scss" scoped>
:deep(.mainContainer) {
  top: var(--header-top-height);
  //  background-color: var(--main-bg-color);
  // height:100%;
  width: unset;
  right: 0px;
  pointer-events: auto;
}


:deep(.topContainer) {
  height: var(--header-top-height);
  border-bottom: solid 2px #eee;
  pointer-events: auto;
}

.rightContainer {
  overflow: hidden;
}

.centerdiv {
  overflow: hidden;
}
</style>
