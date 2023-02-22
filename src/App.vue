<template>
  <ConfigProvider :locale="zh_CN">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
  </ConfigProvider>
</template>

<script lang="ts">
  import { ConfigProvider } from 'ant-design-vue';
  import { Global,onLockListener, unLockListener } from 'xframelib';
  import { addAPIProvider } from '@iconify/vue';
  import {defineComponent,onMounted,onUnmounted } from 'vue';
  import zh_CN from "ant-design-vue/lib/locale/zh_CN";
  export default defineComponent({
    name: 'App',
    components: {
      ConfigProvider
    },
    setup() {
      //TODO:检查必要参数是否配置

      //注册自己的IconAPIProvider
      if(Global.Config.ServiceURL.IconServiceURL)
      addAPIProvider('', { resources: [Global.Config.ServiceURL.IconServiceURL]});
      else
      {//离线使用图标：生效，IconServiceURL配置为空
        import('./components/IconOffline').then(it=>{
          it.default();
        });
      }
      onMounted(() => {
        onLockListener(); //长时间不操作退出
      });

      onUnmounted(() => {
        unLockListener();
      });
      return {
        zh_CN
      };
    }
  });
</script>
