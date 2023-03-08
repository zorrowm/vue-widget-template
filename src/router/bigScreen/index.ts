import { RouteRecordRaw } from 'vue-router';

const mainLayout = {
  path: '/bigscreen',
  name: 'bigscreen',
  component: () => import('@/layouts/bigScreen/index.vue'),
  meta: {
    title: '',
  },
  children: [
    {
      path: '/test',
      name: 'test',
      meta: {
        title: 'routes.home',
        icon: 'iconfont icon-Home-Filled'
      },
      component: () => import('@/views/bigScreen/testView.vue') 
    },
    {
      path: '/test2',
      name: 'test2',
      meta: {
        title: 'routes.home',
        icon: 'iconfont icon-Home-Filled'
      },
      component: () => import('@/views/bigScreen/test2View.vue') 
    }
  ]
};
export default mainLayout;
