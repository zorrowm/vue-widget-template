<template>
  <i :class="iconCss"></i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { string } from "vue-types";
  export default defineComponent({
    name: 'IconFont',
    props: {
      icon: string().isRequired,
    },
    components: {},
    setup(props, { attrs, slots, emit }) {
      const iconCss = computed(() => {
        const result = `iconfont ${props.icon}`;
        return result;
      });
      return {
        iconCss
      };
    }
  });
</script>
