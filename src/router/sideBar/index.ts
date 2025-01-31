import mainroutes from './modules/index';
import { RouteRecordRaw } from 'vue-router';
import { getRouteURL } from '@/utils/sysTool';
const path = '/sideBar';
const defaultPath='/sideBar/sideLine2';
const mainLayout: RouteRecordRaw = {
  path,
  name: 'sideBar',
  redirect: defaultPath,
  // redirect: '/mapping/layers',
  component: () => import('@/layouts/sideBar/index.vue'),
  meta: {
    title: '侧面布局',
    layoutID:'sideBarLayout',
    hidden: true
  },
  children: [
    {
      path:'sideLine2',
      name: 'sideLine2',
      redirect: getRouteURL(mainroutes[0]?.path, defaultPath),
      component: () => import('@/layouts/sideLine/index.vue'),
      meta: {
        title: '',
      },
      children: mainroutes
    }
  ]
};
export default mainLayout;
