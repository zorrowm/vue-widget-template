<template></template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref } from 'vue';

  export default defineComponent({
    name: '',
    props: {},
    components: {},
    setup(props, { attrs, slots, emit }) {
      const data = reactive({});
      const refData = toRefs(data);
      return {
        ...refData
      };
    }
  });
</script>

<style scoped lang="scss"></style>
