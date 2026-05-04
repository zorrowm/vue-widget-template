<template>
  <div>
    门户-》默认首页
    <div v-media="'text-h2.gt.lg text-h4.md text-h6.sm test.sm'">
      时空影像云平台
    </div>
    <XWidgetWindow :has-max="true" :isDark="true" ref="xwidgetWindowRef" title="图层管理" top="40px" left="100px"
      :pid="widgetID" @loaded="onLoaded" @close="onClosed">
      <div style="width:100%;height:100%;background-color: #f00;">
        <span style="font-size: 20px;">图层管理树</span>
      </div>
    </XWidgetWindow>
  </div>
</template>

<script setup lang="ts">
import { XWindow as XWidgetWindow } from 'xframelib';
import { ref } from 'vue'
const widgetID = 'layerTreeWidget';
const xwidgetWindowRef = ref();

function onClosed(panelData: any) {
  console.log('初始化完成', panelData);
  setTimeout(() => {
    if (xwidgetWindowRef.value) {
      xwidgetWindowRef.value.open();
      console.log('重新打开窗体')
    }

  }, 3000);
}
function onLoaded(panelData: IPanelData) {
  console.log('初始化完成', panelData);

}
</script>

<style scoped lang="scss">
.text-h2 {
  font-size: 40px;
}

.text-h4 {
  font-size: 28px;
}

.text-h6 {
  font-size: 18px;
}

.test {
  color: #f00;
}
</style>
