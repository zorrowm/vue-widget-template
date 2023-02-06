<template>
  <div class="demo1">
    <div class="topInfo">
      这是测试的视图
      <div class="test1"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, onUnmounted } from 'vue';
  import { Global } from 'xframelib';

  export default defineComponent({
    name: 'testView',
    props: {},
    components: {},
    setup(props, { attrs, slots, emit }) {
      const data = reactive({});
      const refData = toRefs(data);
      Global.LayoutManager?.changeWidgetVisible('bottomMenuWidget', false);
      onUnmounted(() => {
        // targetWidget.style.visibility = 'visible';
        Global.LayoutManager?.changeWidgetVisible('bottomMenuWidget', true);
      });
      return {
        ...refData
      };
    }
  });
</script>

<style scoped lang="scss">
  .demo1 {
    background-color: #aaa;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .topInfo {
    margin-top: 70px;
    font-size: 24px;
    color: red;
  }
  .test1 {
    position: absolute;
    top: 100px;
    left: 0px;
    bottom: 20px;
    right: 0px;
    background-image: url('/demo2/testview.png');
    background-size: contain;
  }
</style>
