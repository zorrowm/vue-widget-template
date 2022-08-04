import {MenuItemEnum} from '@/enums/menuEnum';
export interface IWidgetMenu {
  name: string; //菜单名
  index?: number; //排序
  icon?: string; //图标名
  path?: string; //控件名、路由路径或URL路径
  type?: MenuItemEnum; //0,1,2
  blank?: boolean; //是否空白页打开，针对1，2情况
  selected?: boolean; //是否选中
  children?: Array<IWidgetMenu>;
  hidden?: boolean; //是否是隐藏菜单
  group?: string; //菜单分组，主菜单默认无分组，其他菜单按分组来,
  unload?: boolean; //点击时卸载组件，默认是隐藏组件
  tag?: object; //传递的数据（备用），主要为action传参
}
