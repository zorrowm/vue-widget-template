<template>
  <div class="bottomLine">
    <template v-for="(item,index) in smallIcons" :key="index">
     <img src="/img/logo.png" width="32" height="32" :title="props.title" @click="showHidePanel"/>
   </template>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
const smallIcons=ref([]);

</script>

<style lang="scss" scoped>
   .bottomLine
   {
     position: absolute;
     left:0;
     bottom: 0;
     width: 100%;
     height: 30px;
     background-color: #f00;
     display: flex;
     justify-content: flex-start;
     z-index: 10;
   }
</style>
