import type { IWidgetConfig } from 'xframelib';
import {LayoutContainerEnum} from 'xframelib'

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IWidgetConfig> = [
  {
    layoutID: 'backLayout', //归属组
    id: 'HeaderTitleWidget',
    label: '头部栏',
    container: LayoutContainerEnum.top,
    component: () => import('@/widgets/back/HeaderTitleWidget.vue'),
    preload: true
  },
  {
    layoutID: 'backLayout', 
    id: 'LogoTitleWidget',
    label: '图标标题',
    container: LayoutContainerEnum.top,
    component: () => import('@/widgets/back/LogoTitleWidget.vue'),
    preload: true,
    afterid:'HeaderTitleWidget'
  },
  {
    layoutID: 'backLayout', //归属组
    id: 'FooterCopyrightWidget',
    label: '底部栏',
    container: LayoutContainerEnum.bottom,
    component: () => import('@/widgets/layouts/FooterCopyrightWidget.vue'),
    preload: false //需要根据配置判断是否加载
  },
  {
    layoutID: 'backLayout', //归属组
    id: 'ModalContainerWidget',
    label: '弹框容器',
    container: LayoutContainerEnum.top,
    component: () => import('@/widgets/layouts/ModalContainerWidget.vue'),
    preload: true
  },
  {
    layoutID: 'backLayout', //
    id: 'SideMenuWidget',
    label: '左侧菜单',
    container: LayoutContainerEnum.left,
    component: () => import('@/widgets/layouts/SideMenuWidget.vue'),
    preload: true
  }
];

export default defaultWidgetCofig;
