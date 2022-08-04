
// import {RouterTransition} from '@/components/transition'

/**
 * 不需要授权就可以访问的页面
 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '系统登录',
      hidden: true,
      isSystem: true
    },
    component: () => import('@/views/shared/login/index.vue') //'@/views/shared/login/index.vue'
  },
];

export default routes;
