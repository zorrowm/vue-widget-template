
import backroutes from './modules/index';
import { getRouteURL } from '@/utils/sysTool';
const path = '/back';
const backLayout = {
  path,
  name: 'BackLayout',
  component: () => import('@/layouts/back/backLayout.vue'),
  redirect: getRouteURL(backroutes[0]?.path, path), //backroutes[0]?.path ?? '',
  meta: {
    title: '',
    layoutID:'backLayout',
    hidden: true,
    isadmin:true
  },
  children: backroutes
};
export default backLayout;
