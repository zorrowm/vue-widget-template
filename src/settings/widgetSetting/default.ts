import type { IWidgetConfig } from 'xframelib';
import {LayoutContainerEnum} from 'xframelib'

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'cesiumLayout', //归属组
    id: 'headerTitleWidget',
    label: '头部栏',
    container: LayoutContainerEnum.bottom,
    component: () => import('@/widgets/header/HeaderTitleWidget.vue'),
    preload: false
  }
  // {
  //   id: 'bottomMenuWidget',
  //   container: LayoutContainerEnum.bottom,
  //   component: () => import('@/widgets/footer/BottomMenuWidget.vue'),
  //   preload: true
  // },
  // {
  //   id: 'statusWidget',
  //   container: LayoutContainerEnum.bottom,
  //   component: () => import('@/widgets/footer/StatusWidget.vue'),
  //   preload: true
  // }
];

export default defaultWidgetCofig;
