import mainroutes from './modules/index';
import { RouteRecordRaw } from 'vue-router';
import { getRouteURL } from '@/utils/sysTool';
const path = '/sideLine';

const mainLayout: RouteRecordRaw = {
  path,
  name: 'sideLine',
  redirect: getRouteURL(mainroutes[0]?.path, path),
  // redirect: '/mapping/layers',
  component: () => import('@/layouts/sideLine/index.vue'),
  meta: {
    title: '',
    layoutID:'sideLineLayout',
    hidden: true
  },
  children: mainroutes //[]
};
export default mainLayout;
