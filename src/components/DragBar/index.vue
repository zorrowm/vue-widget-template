<template>
  <div :class="getClass" :style="getDragBarStyle"></div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref, ref } from 'vue';
  import { appStore } from '@/store';
  export default defineComponent({
    name: 'DragBar',
    props: {
      mobile: Boolean
    },
    setup(props) {
      const appStoreState = appStore();
      const getDragBarStyle = computed(() => {
        const width = appStoreState.projectConfig?.menuSetting.menuWidth;
        if (unref(true)) {
          return { left: `${unref(width)}px` };
        }
        return {};
      });

      const getClass = computed(() => {
        return [
          'my-darg-bar'
          // {
          //   "my-darg-bar--hide": !unref(getCanDrag) || props.mobile,
          // },
        ];
      });

      return {
        getDragBarStyle,
        getClass
      };
    }
  });
</script>
<style lang="less" scoped>
  .my-darg-bar {
    position: absolute;
    top: 0;
    right: -2px;
    z-index: 10;
    width: 2px;
    height: 100%;
    cursor: col-resize;
    border-top: none;
    border-bottom: none;

    &--hide {
      display: none;
    }

    &:hover {
      background-color: rgb(148, 140, 140);
      box-shadow: 0 0 4px 0 rgba(28, 36, 56, 0.15);
    }
  }
</style>
