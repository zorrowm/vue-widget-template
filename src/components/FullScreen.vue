<template>
  <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggle">
      <Icon icon="ant-design:fullscreen-outlined" v-if="!isFullscreen" />
      <Icon icon="ant-design:fullscreen-exit-outlined"  v-else />
    </span>
  </Tooltip>
</template>
<script lang="ts">
  import { Tooltip } from 'ant-design-vue';
  import { object } from "vue-types";
  import { defineComponent,computed,ref } from 'vue';
  import { H5Tool } from 'xframelib';
  export default defineComponent({
    name: 'FullScreen', //FullscreenOutlined
    components: {Tooltip },
    props: {
      target: object<any | Element>()
    },
    setup(props) {
      function toggle() {
        if (isFullscreen.value) {
          H5Tool.exitFullScreen();
          isFullscreen.value = false;
        } else {
          H5Tool.requestFullScreen(props.target);
          isFullscreen.value = true;
        }
      }
      const isFullscreen = ref(false); //computed(() => H5Tool.isFullScreen());
      const getTitle = computed(() => {
        return isFullscreen.value? '退出全屏':'全屏';
      });
      return {
        getTitle,
        isFullscreen,
        toggle
      };
    }
  });
</script>
