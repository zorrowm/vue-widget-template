import type { IWidgetConfig } from 'xframelib';
import {LayoutContainerEnum} from 'xframelib'

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'portalLayout', //归属组
    id: 'HeaderTitleWidget',
    label: '头部栏',
    container: LayoutContainerEnum.top,
    component: () => import('@/widgets/portal/HeaderTitleWidget.vue'),
    preload: true
  },
  {
    layoutID: 'portalLayout', //归属组
    id: 'FooterCopyrightWidget',
    label: '底部栏',
    container: LayoutContainerEnum.bottom,
    component: () => import('@/widgets/layouts/FooterCopyrightWidget.vue'),
    preload: true //需要根据配置判断是否加载
  },
  {
    layoutID: 'portalLayout', //归属组
    id: 'ModalContainerWidget',
    label: '弹框容器',
    container: LayoutContainerEnum.top,
    component: () => import('@/widgets/layouts/ModalContainerWidget.vue'),
    preload: true
  },
];

export default defaultWidgetCofig;
