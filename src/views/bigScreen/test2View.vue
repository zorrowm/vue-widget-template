<template>
  <!-- <div class="demo2"></div> -->
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from 'vue';
  import { Global } from 'xframelib';

  export default defineComponent({
    name: 'test2View',
    props: {},
    components: {},
    setup(props, { attrs, slots, emit }) {
      const id = 'test2Widget';
      Global.LayoutManager?.loadWidget(id);
      onUnmounted(() => {
        Global.LayoutManager?.unloadWidget(id);
      });
      return {};
    }
  });
</script>

<style scoped lang="scss">
  .demo2 {
    background-color: yellow;
    width: 100%;
    height: 100%;
  }
</style>
