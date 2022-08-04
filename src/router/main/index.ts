import mainroutes from './modules/index';
import { getRouteURL } from '@/utils/sysTool';
const path = '/';
const mainLayout = {
  path,
  name: 'Main',
  component: () => import('@/layouts/main/index.vue'),
  redirect: getRouteURL(mainroutes[0]?.path, path),
  meta: {
    title: '',
    hidden: true,
    isSystem: true
  },
  children: mainroutes //[]
};
export default mainLayout;
