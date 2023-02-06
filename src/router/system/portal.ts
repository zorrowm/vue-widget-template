import mainroutes from './portal-modules/index';
import { getRouteURL } from '@/utils/sysTool';
const path = '/';
const mainLayout = {
  path,
  name: 'Portal',
  component: () => import('@/layouts/portal/index.vue'),
  redirect: getRouteURL(mainroutes[0]?.path, path),
  meta: {
    title: '',
    hidden: true,
    isSystem: true
  },
  children: mainroutes //[]
};

export default [mainLayout];
