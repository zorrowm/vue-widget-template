import mainroutes from './modules/index';
import { getRouteURL } from '@/utils/sysTool';
import { RouteRecordRaw } from 'vue-router';
const path = '/main';
const mainLayout:RouteRecordRaw = {
  path,
  name: 'Main',
  component: () => import('@/layouts/main/index.vue'),
  redirect: getRouteURL(mainroutes[0]?.path, path),
  meta: {
    title: '主页面布局',
    layoutID:'defaultLayout',
    hidden: true
  },
  children: mainroutes //[]
};
export default mainLayout;
