import { MenuItemEnum } from '@/enums/menuEnum';
import type { IWidgetMenu } from '@/models/IWidgetMenu';
const menuCofig: Array<IWidgetMenu> = [
  // {
  //   name: '漫游',
  //   index: 0,
  //   type: MenuItemEnum.Widget,
  //   children: [
  //     {
  //       name: '飞行',
  //       path: 'flyGroupMenuWidget',
  //       type: MenuItemEnum.Widget,
  //       children: [
  //         {
  //           name: '全球旋转',
  //           path: 'earthRotationWidget',
  //           icon: 'icon-a-Theglobalrotation_1',
  //           type: MenuItemEnum.Widget
  //         },
  //         {
  //           name: '中心点旋转',
  //           path: 'centerRotationWidget', //'centerRotationWidget',
  //           icon: 'icon-a-Centerpivot_1',
  //           type: MenuItemEnum.Widget,
  //           tag: {
  //             internal: 20 //ms
  //           }
  //         }
  //         // {
  //         //   name: '中心点旋转',
  //         //   path: 'AutoRotateHeading', //'centerRotationWidget',
  //         //   icon: 'icon-a-Centerpivot_1',
  //         //   type: MenuItemEnum.Action,
  //         //   tag: {
  //         //     internal: 20 //ms
  //         //   }
  //         // }
  //       ]
  //     },
  //     {
  //       name: '视角',
  //       path: 'viewGroupMenuWidget',
  //       type: MenuItemEnum.Widget,
  //       children: [
  //         {
  //           name: '全球',
  //           path: 'globalViewWidget',
  //           type: MenuItemEnum.Widget
  //         },
  //         {
  //           name: '全国视角',
  //           path: 'chinaViewWidget',
  //           type: MenuItemEnum.Widget,
  //           unload: true //点击时卸载
  //         }
  //       ]
  //     },
  //     {
  //       name: '定位',
  //       path: 'locationWidget',
  //       type: MenuItemEnum.Widget,
  //       unload: true //点击时卸载
  //     }
  //   ]
  // },
  // {
  //   name: '视图',
  //   index: 1,
  //   type: MenuItemEnum.Widget,
  //   children: [
  //     {
  //       name: '图层管理',
  //       path: 'layerManageWidget',
  //       type: MenuItemEnum.Widget
  //     },
  //     {
  //       name: '在线影像底图',
  //       path: 'imageBaseLayerWidget',
  //       type: MenuItemEnum.Widget
  //     },
  //     {
  //       name: '图层卷帘',
  //       path: 'splitWidget',
  //       type: MenuItemEnum.Widget,
  //       unload: true
  //     },
  //     {
  //       name: '分屏测试',
  //       path: 'twoViewWidget',
  //       type: MenuItemEnum.Widget,
  //       unload: true //点击时卸载
  //     }
  //   ]
  // }
];

export default menuCofig;
