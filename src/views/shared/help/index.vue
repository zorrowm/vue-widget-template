<template>提供系统内部辅助功能页面</template>

<script lang="ts">
  import { bussinessRoutes } from '@/router';
  import functionList from '@/settings/functionSetting';
  import widgetMenuConfig from '@/settings/widgetMenuSetting';
  import widgetConfig from '@/settings/widgetSetting';
  import { getSystemPKG } from '@/utils/sysTool';
  import { Global, ISysRightOptions,  writeSysRoleRight } from 'xframelib';
  import {  defineComponent } from 'vue';
  import {useRoute} from 'vue-router'

  export default defineComponent({
    name: '',
    props: {},
    components: {},
    setup(props, { attrs, slots, emit }) {
      const route = useRoute();
      const name = route.params.name;
      switch (name) {
        case 'register':
          const bRoutes = [...bussinessRoutes];
          // translateTitle(bRoutes);
          const options: ISysRightOptions = {
            bussinessRoutes: bRoutes,
            widgetConfig,
            functionList,
            widgetMenuConfig,
            pkgObject: getSystemPKG()
          };
          //导出菜单JSON
          writeSysRoleRight(options, 'MenuRoutes');
          break;
        default:
          Global.Message?.warn(`方法名:${name}不支持，只有register或icon`);
          break;
      }
      // function translateTitle(bRoutes: RouteRecordRaw[]) {
      //   bRoutes.forEach(item => {
      //     if (item.meta) {
      //       const title = item.meta.title as string;
      //       if (title && title.indexOf('.') > 0) {
      //         item.meta.title = Global.t(title);
      //       }
      //     }
      //     if (item.children) translateTitle(item.children);
      //   });
      // }
      return {};
    }
  });
</script>
