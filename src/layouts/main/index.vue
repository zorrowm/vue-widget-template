<template>
  <LayoutContainer :widgetConfig="configRef" :layoutID="layoutIDRef" @containerLoaded="loadedHandler" />
</template>

<script lang="ts">
import widgetCofig from '@/settings/widgetSetting/index';
import { defineComponent, ref } from "vue";
import { Global,LayoutContainer } from 'xframelib';
export default defineComponent({
  name: '',
  components: {
    LayoutContainer
  },
  setup(props, { attrs, slots, emit }) {
    const configRef = ref(widgetCofig);
    const layoutIDRef = ref('defaultLayout');
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
    return {
      configRef,
      layoutIDRef,
      loadedHandler
    };
  }
});
</script>

<style lang="scss">

.rightContainer {
  overflow: hidden;
}

.leftContainer {
  overflow: hidden;
  pointer-events: none;
}
.mainContainer
{
  pointer-events: auto;
}

.centerdiv {
  overflow: hidden;
}
</style>
