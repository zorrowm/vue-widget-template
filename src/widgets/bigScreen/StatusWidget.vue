<template>
  <div class="footerStatus">
    <a :href="websiteURL" target="_blank">
      <span class="copyright">{{ copyinfo }}</span>
    </a>
    <div class="fl msginfo">{{ statusInfo }}</div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue';
  import { Global } from 'xframelib';
  import {  OnEventHandler } from '@/events';

  export default defineComponent({
    name: 'copyright',
    props: {},
    components: {},
    setup() {
      const copyinfo = ref(Global.Config.UI?.CopyRight);
      const statusInfo = ref('');
      const websiteURL = ref(Global.Config.UI?.WebSite);
      //监听：全局提示信息
      // OnEventHandler(SystemEvents.SatusMessage, data => {
      //   statusInfo.value = data;
      // });
      return { copyinfo, statusInfo, websiteURL };
    }
  });
</script>

<style scoped>
  .footerStatus {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    /* margin: -20px auto 0; */
    text-align: center;
    line-height: 20px;
    /* background-color: red; */
    overflow: hidden;
  }
  .msginfo {
    margin: 0px 0 0 10px;
    width: 90%;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
  }
  .copyright {
    color: #fff;
    font-size: 8px;
    line-height: 20px;
  }
</style>
