import { RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/epsg/:id',
    name: 'epsg-info',
    component: () => import('@/views/portal/epsg/index.vue'),
    meta: {
      index: 2,
      title: '详情页',
      hidden: true,
      isSystem: true
    }
  }
];

export default routes;
