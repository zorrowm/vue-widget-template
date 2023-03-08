import { RouteRecordRaw } from 'vue-router';

const routeName = 'layersview';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'layers',
    name: routeName,
    component: () => import('@/views/sideLine/index.vue'),
    meta: {
      title: '图层树',
      icon: 'gis:layers-o'
    }
  },
  {
    path: 'datasource',
    name: 'datasourceview',
    component: () => import('@/views/sideLine/index.vue'),
    meta: {
      title: '数据源',
      icon: 'ant-design:database-outlined'
    }
  },
  {
    path: 'fonts',
    name: 'fontsview',
    component: () => import('@/views/sideLine/index.vue'),
    meta: {
      title: '字体',
      icon: 'ant-design:font-size-outlined'
    }
  },
  {
    path: 'icons',
    name: 'iconsview',
    component: () => import('@/views/sideLine/index.vue'),
    meta: {
      title: '图标',
      icon: 'ant-design:ant-design-outlined'
    }
  },
  {
    path: 'settings',
    name: 'settingsview',
    component: () => import('@/views/sideLine/index.vue'),
    meta: {
      title: '设置',
      icon: 'ant-design:setting-outlined'
    }
  },
  // {
  //   path: 'code',
  //   name: 'codeview',
  //   component: () => import('@/views/sideLine/code/index.vue'),
  //   meta: {
  //     title: '源码',
  //     icon: 'ant-design:code-outlined'
  //   }
  // }
];

export default routes;
