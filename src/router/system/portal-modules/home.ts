import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/portal/home/index.vue'),
    meta: {
      index: 1,
      title: '查询-首页',
      hidden: true,
      isSystem: true
    }
  },
  // {
  //   path: '/api',
  //   name: 'api',
  //   component: () => import('@/views/main/api/index.vue'),
  //   meta: {
  //     index: 5,
  //     title: '开发接口',
  //     hidden: true,
  //     isSystem: true
  //   }
  // }
];

export default routes;
