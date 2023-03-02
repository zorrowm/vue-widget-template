<template>
  <ConfigProvider :locale="zh_CN">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
  </ConfigProvider>
</template>

<script lang="ts">
  import { ConfigProvider } from 'ant-design-vue';
  import { Global,onLockListener, unLockListener,ISysRightOptions,exportSystemRights } from 'xframelib';
  import { addAPIProvider } from '@iconify/vue';
  import {defineComponent,onMounted,onUnmounted } from 'vue';
  import zh_CN from "ant-design-vue/lib/locale/zh_CN";

  import { bussinessRoutes } from '@/router';
  import functionList from '@/settings/functionSetting';
  import widgetMenuConfig from '@/settings/widgetMenuSetting';
  import widgetConfig from '@/settings/widgetSetting';
  import { getSystemPKG } from '@/utils/sysTool';
  import fs from 'vite-plugin-fs/browser';

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
      //如果是开发环境下，执行
      if (import.meta.env.DEV) 
      {
        Global.Logger().info("开发环境中……");
        const promiseA = new Promise((resolve, reject) => {
          const bRoutes = [...bussinessRoutes];
          // translateTitle(bRoutes);
          const options: ISysRightOptions = {
            bussinessRoutes: bRoutes,
            widgetConfig,
            functionList,
            widgetMenuConfig,
            pkgObject: getSystemPKG()
          };
        const data=  exportSystemRights(options);
        fs.writeFile("./public/MenuRoutes.json", JSON.stringify(data));
        resolve(true);
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
