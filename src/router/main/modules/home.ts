
const routes: Array<RouteRecordRaw> = [
  {
    path: '/main/test',
    name: 'main-test',
    component: () => import('@/views/back/welcome/index.vue'),
    meta: {
      index: 1,
      title: '',
      hidden: true,
      isSystem: true
    }
  }
];

export default routes;
