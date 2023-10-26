import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main/test',
    name: 'main-test',
    component: () => import('@/views/main/index.vue'),
    meta: {
      index: 1
    }
  }
];

export default routes;
