import { MenuItemEnum } from '@/enums/menuEnum';
import type { IMenuConfig } from '#/menuConfig';
const menuCofig: Array<IMenuConfig> = [

  {
    name: '二三维联动',
    index: 30,
    // path: 'linkDefaultWidget',
    type: MenuItemEnum.Widget,
    children: [
      {
        name: '飞行漫游',
        path: 'flyRoamingWidget',
        type: MenuItemEnum.Widget,
        unload: true
      },
      {
        name: '情景模拟',
        path: 'SimulationWidget',
        type: MenuItemEnum.Widget,
        unload: true
      },
      {
        name: 'MapBox',
        path: 'twoViewMBWidget',
        type: MenuItemEnum.Widget,
        unload: true
      },
      {
        name: 'OpenLayers',
        path: 'twoViewOLWidget',
        type: MenuItemEnum.Widget,
        unload: true
      }
      // {
      //   name: '分屏',
      //   path: 'cesiumWidgetSplit',
      //   type: MenuItemEnum.Widget
      // }
    ]
  }
];

export default menuCofig;
