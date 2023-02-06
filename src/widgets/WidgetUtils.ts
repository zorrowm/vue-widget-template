import { deepMerge } from 'xframelib';
import type { IMenuConfig } from '#/menuConfig';

import { Global } from 'xframelib';
/**
 * 过滤查找目标菜单的Widget
 * @param menuCofig
 * @param menuPath
 * @returns
 */
export function findMenuConfig(menuCofig: Array<IMenuConfig>, menuPath: string): IMenuConfig {
  let result: IMenuConfig;
  for (const menuItem of menuCofig) {
    if (menuItem.path === menuPath) {
      result = menuItem;
      break;
    } else if (menuItem.children) {
      const childResult = findMenuConfig(menuItem.children, menuPath);
      if (childResult) {
        result = childResult;
        break;
      }
    }
  }
  return result;
}
/**
 * 通过菜单名找到菜单项（针对分组情况）
 * @param menuCofig
 * @param menuName
 * @returns
 */
export function findMenuItem(menuCofig: Array<IMenuConfig>, menuName: string): IMenuConfig {
  let result: IMenuConfig;
  for (const menuItem of menuCofig) {
    if (menuItem.name === menuName) {
      result = menuItem;
      break;
    } else if (menuItem.children) {
      const childResult = findMenuItem(menuItem.children, menuName);
      if (childResult) {
        result = childResult;
        break;
      }
    }
  }
  return result;
}

let rotateCameraHandler: (...params: any[]) => any;

