
const routeName = 'home';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'home',
    name: routeName,
    meta: {
      index: 2,
      title: '首页',
      icon: 'ant-design:home-outlined' //'ant-design:home-outlined'
    },
    component: () => import('@/views/back/home/index.vue') //
  }
];

export default routes;
