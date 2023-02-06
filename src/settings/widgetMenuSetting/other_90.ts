import { MenuItemEnum } from '@/enums/menuEnum';
import type { IMenuConfig } from '#/menuConfig';
const menuCofig: Array<IMenuConfig> = [
  {
    name: '示例',
    index: 99,
    path: 'rightMenuWidget',
    type: MenuItemEnum.Widget,
    unload: true
  },
  {
    name: '设置',
    index: 100,
    path: 'widgetSetting',
    type: MenuItemEnum.Widget
  }
];
export default menuCofig;
