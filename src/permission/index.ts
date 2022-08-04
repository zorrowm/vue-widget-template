import { userStore } from '@/store';
import { Global,getFunctions, getRoutes, getWidgetConfig, IWidgetConfig, getWidgetMenus } from 'xframelib';
import { bussinessRoutes } from '@/router';


import functionSettings from '@/settings/functionSetting';
import widgetMenuSetting from '@/settings/widgetMenuSetting';
import widgetConfigSetting from '@/settings/widgetSetting';
import { IWidgetMenu } from '@/models/IWidgetMenu';

let functionList;

/**
 * 获取用户最大角色等级
 * @returns 
 */
export function getDefaultMaxRoleLevel():number
{
  const userState = userStore();
  //是否是超级管理员
  return userState.DefaultMaxRoleLevel;
}
/**
 * 清除权限
 */
export function clearRight() {
  functionList = undefined;
}
/**
 * 判断是否有权限
 * @param funcID 功能标识
 * @returns
 */
export function hasFunction(funcID: string): boolean {
  if (!functionList) functionList = getFunctions(functionSettings,getDefaultMaxRoleLevel());
  if (!functionList || functionList.length === 0) return false;
  return functionList.findIndex(item => item.id === funcID) >= 0;
}

/**
 * 获取授权的路由菜单
 * @returns
 */
export function getRightRoutes(): Array<RouteRecordRaw> | undefined {
  const rightRoutes = Global.Config.UI.IsNoLogin?bussinessRoutes:getRoutes(bussinessRoutes,getDefaultMaxRoleLevel());
  return rightRoutes;
}

/**
 * 获取授权的Widget菜单列表
 */

export function getRightWidgetMenus(): Array<IWidgetMenu> | undefined {
  return Global.Config.UI.IsNoLogin?widgetMenuSetting:getWidgetMenus(widgetMenuSetting,getDefaultMaxRoleLevel());
}
/**
 * 获取授权的Widget组件列表
 * @returns
 */
export function getRightWidgetConfig(): Array<IWidgetConfig> | undefined {
  return Global.Config.UI.IsNoLogin?widgetConfigSetting:getWidgetConfig(widgetConfigSetting,getDefaultMaxRoleLevel());
}
