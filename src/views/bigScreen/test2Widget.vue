<template>
  <div class="demofront"></div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue';
  const name = 'test2Widget';
  export default defineComponent({
    name: name,
    props: {},
    components: {},
    setup(props, { attrs, slots, emit }) {
      return {};
    }
  });
</script>

<style scoped lang="scss">
  .demofront {
    position: absolute;
    top: 77px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: 1000;
    background-image: url('/demo2/大数据运维总览图.png');
    background-size: 100% auto;
  }
</style>
