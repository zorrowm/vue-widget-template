import { LayoutContainerEnum } from 'xframelib';
import type { IWidgetConfig } from 'xframelib';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'headerTitleWidget',
    label: '头部栏',
    container: LayoutContainerEnum.top,
    component: () => import('@/widgets/bigScreen/HeaderTitleWidget.vue'),
    preload: true
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'bottomMenuWidget',
    container: LayoutContainerEnum.bottom,
    component: () => import('@/widgets/bigScreen/BottomMenuWidget.vue'),
    preload: true
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'statusWidget',
    container: LayoutContainerEnum.bottom,
    component: () => import('@/widgets/bigScreen/StatusWidget.vue'),
    preload: true
  },
  {
    layoutID: 'bigScreenLayout', //归属组
    id: 'cesiumWidget',
    container: LayoutContainerEnum.centerBack,
    component: () => import('@/widgets/bigScreen/CesiumWidget.vue'),
    preload: true
  },
];

export default defaultWidgetCofig;
