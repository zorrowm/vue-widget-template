
const routeName = 'map';
const routes: Array<RouteRecordRaw> = [
  {
    path: 'map',
    name: routeName,
    meta: {
      index: 2,
      title: '地图',
      icon: 'ant-design:home-outlined'
    },
    component: () => import('@/views/back/mapview/index.vue') //
  }
];

export default routes;
