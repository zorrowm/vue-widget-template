<template>
  <div class="dcScreen-container">
    <div ref="scaleContainerRef" class="dcScreen">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { H5Tool } from 'xframelib';

const scaleContainerRef = ref(null);
let initWidth = 1920;
let initHeight = 1080;
function getScale(width = 1920, height = 1080) {
  let ww = window.innerWidth / width;
  let wh = window.innerHeight / height;
  return ww < wh ? ww : wh;
}
function resize() {
  if (scaleContainerRef.value) {
    scaleContainerRef.value.style.transform = `scale(${getScale(
      initWidth,
      initHeight
    )}) translate(-50%, -50%)`;
  }
}

onMounted(() => {
  // initWidth = initWidth > window.innerWidth ? window.innerWidth : initWidth;
  // initHeight =
  //   initHeight > window.innerHeight ? window.innerHeight : initHeight;
  if (scaleContainerRef.value) {
    scaleContainerRef.value.style.width = initWidth + 'px';
    scaleContainerRef.value.style.height = initHeight + 'px';
    resize();
  }
  // 为浏览器绑定事件
  H5Tool.windowResizeHandler(resize);
});
</script>

<style lang="scss" scoped>
.dcScreen-container {
  width: 100%;
  height: 100vw;
  // background-color: #aaa;
  // background: url('assets/images/bg.png') no-repeat;
  // background-repeat: no-repeat;
  // background-attachment: fixed;
  // background-position: center;
  // background-size: 100% 100%;
  // background-size: cover;
  .dcScreen {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s;
    transform-origin: left top;
  }
}
</style>
