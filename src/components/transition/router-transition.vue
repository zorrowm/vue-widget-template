<template>
  <SuspenseWithError>
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="zoom-fade" mode="out-in" appear> -->
      <keep-alive :include="keepAliveComponents">
        <component :is="Component" />
      </keep-alive>
      <!-- </transition> -->
    </router-view>
  </SuspenseWithError>
</template>

<script lang="ts">
  import SuspenseWithError from '@/components/SuspenseWithError.vue';
  import { asyncRouteStore } from '@/store';
  import { bool } from "vue-types";
  import { defineComponent,computed } from 'vue';
  export default defineComponent({
    name: 'RouterTransition',
    components: { SuspenseWithError },
    props: {
      notNeedKey: bool().def(false),
      animate: bool().def(true),
    },
    setup() {
      // 需要缓存的路由组件
      const keepAliveComponents = computed(() => asyncRouteStore()?.keepAliveComponents);

      return {
        keepAliveComponents
      };
    }
  });
</script>
