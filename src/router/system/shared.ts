
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
      isSystem: true
    },
    component: () => import('@/views/shared/login/index.vue') //'@/views/shared/login/index.vue'
  },
  {
    path: '/onelogin',
    name: 'onelogin',
    meta: {
      title: '统一登录',
      isSystem: true
    },
    component: () => import('@/views/shared/onelogin/index.vue') 
  },
  {
    path: '/onelogin-portal',
    name: 'onelogin-portal',
    meta: {
      title: '统一验证导航页',
      isSystem: true
    },
    component: () => import('@/views/shared/onelogin/OneLoginPortal.vue') 
  },
  
];

export default routes;
