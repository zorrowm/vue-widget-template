
import { RouterTransition } from '@/components/transition';

const routes: Array<RouteRecordRaw> = [
  {
    path: 'http://www.baidu.com',
    name: 'http://www.baidu.com',
    component: RouterTransition,
    meta: {
      index: 3,
      title: '百度',
      icon: 'ant-design:home-outlined'
    }
  }
];

export default routes;
