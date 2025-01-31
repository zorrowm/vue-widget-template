import { RouterTransition } from '@/components/transition';

const routeName = 'error';

export const notFound = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  //redirect: '/error/404',
  meta: {
    title: '不存在',
    hidden: true,
    isSystem: true
  },
  component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
};

export const errorRoutes = {
  path: '/error',
  name: routeName,
  redirect: '/error/404',
  component: RouterTransition,
  meta: {
    title: '错误页',
    // icon: 'EditOutlined',
    hidden: true,
    isSystem: true
  },
  children: [
    {
      path: '404',
      name: `${routeName}-404`,
      meta: {
        title: '404',
        // icon: 'UserOutlined',
        hidden: true,
        isSystem: true
      },
      component: () => import(/* webpackChunkName: "404" */ '@/views/shared/error/404.vue')
    }
  ]
};

export default [notFound, errorRoutes];
