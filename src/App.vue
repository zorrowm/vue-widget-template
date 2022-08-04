<template>
  <config-provider >
    <SuspenseWithError>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </SuspenseWithError>
  </config-provider>
</template>

<script lang="ts">
  import { ConfigProvider } from 'ant-design-vue';
  import { Global,onLockListener, unLockListener } from 'xframelib';
  import SuspenseWithError from '@/components/SuspenseWithError.vue';
  import { addAPIProvider } from '@iconify/vue';
  import {defineComponent,onMounted,onUnmounted } from 'vue';
  export default defineComponent({
    name: 'App',
    components: {
      ConfigProvider,
      SuspenseWithError
    },
    setup() {
      //TODO:检查必要参数是否配置

      //注册自己的IconAPIProvider
      if(Global.Config.ServiceURL.IconServiceURL)
      addAPIProvider('', { resources: [Global.Config.ServiceURL.IconServiceURL]});

      onMounted(() => {
        onLockListener(); //长时间不操作退出
      });

      onUnmounted(() => {
        unLockListener();
      });
      return {
      };
    }
  });
</script>
