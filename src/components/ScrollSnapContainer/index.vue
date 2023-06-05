<template>
  <div class="scrollSnapContainer" :style="heightStyle">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue';
import { isNumber } from 'xframelib';
const props=defineProps({height:{
  type:Number,
  default:0
}})
const heightStyle=computed(()=>{
  if(isNumber(props.height)&&props.height>0)
  {
    return  `height:${props.height}px`
  }
  return '';
})


</script>
<style>
.scrollSnapContainer
{
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior:smooth;
  scroll-snap-type: y mandatory;   /*激活滚动效果 */
  scroll-snap-stop: always;
  /* 兼容性设置 mandatory*/
  /* 使用非精确捕捉，能允许滚动最终停止在捕捉点的附近而不需要进一步的调整 */
  -webkit-scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling:touch;
}
.scrollSection{
  height: 100%;
  width:100%;
  scroll-snap-align: center;
}
</style>
