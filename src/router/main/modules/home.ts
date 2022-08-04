
const routeName = 'home';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'test',
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
