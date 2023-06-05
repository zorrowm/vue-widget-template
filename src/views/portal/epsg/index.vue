<template>
    <div :style="{ overflow: 'auto', height: containerHeight + 'px' }">
      <div
        v-wow="{ 'animation-name': 'slideInDown' }"
        style="background-color: #f0f; height: 400px; width: 100%"
      ></div>
      <div
        v-wow="{ 'animation-name': 'slideInUp' }"
        style="background-color: #f00; height: 400px; width: 100%"
      ></div>
      <div
        v-wow="{ 'animation-name': 'slideInLeft' }"
        style="background-color: #0f0; height: 400px; width: 100%"
      ></div>
      <div
        v-wow="{ 'animation-name': 'slideInUp' }"
        style="background-color: #005; height: 400px; width: 100%"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
   import LayoutTool from '@/utils/layoutTool';
  import { computed } from 'vue';

  const containerHeight = computed(() => {
    return LayoutTool.getContentHeight();
  });
  </script>
  