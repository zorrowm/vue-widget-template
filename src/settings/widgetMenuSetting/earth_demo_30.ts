import { MenuItemEnum } from '@/enums/menuEnum';
import type { IMenuConfig } from '@/models/IRoleModels';
const menuCofig: Array<IMenuConfig> = [
  {
    name: 'demo',
    index: 30,
    type: MenuItemEnum.Widget,
    children: [
      // {
      //   name: '贴地视频',
      //   path: 'groundVideoWidget',
      //   type: MenuItemEnum.Widget,
      //   unload: true
      // },
      {
        name: 'GIF广告牌',
        path: 'gifBillboardWidget',
        type: MenuItemEnum.Widget,
        unload: true
      },
      {
        name: '轨迹飞行',
        path: 'planeFlyWidget',
        type: MenuItemEnum.Widget,
        unload: true
      }
      // ,
      // {
      //   name: 'Video广告牌',
      //   path: 'billboardVideoWidget',
      //   type: MenuItemEnum.Widget,
      //   unload: true
      // }
    ]
  }
];
export default menuCofig;
