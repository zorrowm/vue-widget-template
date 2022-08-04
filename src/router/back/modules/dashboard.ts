
import { RouterTransition } from '@/components/transition';

const routeName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'dashboard',
    name: routeName,
    redirect: '/back/dashboard/welcome',
    component: RouterTransition,
    meta: {
      index: 1,
      title: '仪表盘',
      icon: 'ant-design:home-outlined'
    },
    children: [
      {
        path: 'welcome',
        name: `${routeName}-welcome`,
        meta: {
          title: '欢迎',
          icon: 'ant-design:global-outlined'
        },
        component: () => import('@/views/back/welcome/index.vue')
      }
    ]
  }
];

export default routes;
