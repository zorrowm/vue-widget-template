import mainroutes from '../sideLine/modules/index';
import { RouteRecordRaw } from 'vue-router';
import { getRouteURL } from '@/utils/sysTool';
const path = '/sideBar';

const mainLayout: RouteRecordRaw = {
  path,
  name: 'sideBar',
  redirect: '/sideBar/sideLine',
  // redirect: '/mapping/layers',
  component: () => import('@/layouts/sideBar/index.vue'),
  meta: {
    title: '',
    hidden: true,
    isSystem: true
  },
  children: [
    {
      path:'sideLine2',
      name: 'sideLine2',
      redirect: getRouteURL(mainroutes[0]?.path, 'sideLine2'),
      // redirect: '/mapping/layers',
      component: () => import('@/layouts/sideLine/index.vue'),
      meta: {
        title: '',
        hidden: true,
        isSystem: true
      },
      children: mainroutes
    }
  ]
};
export default mainLayout;
