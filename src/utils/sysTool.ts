import { Router,RouteRecordRaw } from 'vue-router';
import { H5Tool,Global } from 'xframelib';

/**
 * 获取当前系统的ID
 * （从package获取）
 * @returns
 */
export function getSystemID(): string {
  const { pkg } = __APP_INFO__;
  const sysinfo = `${pkg.name}_${pkg.version}`;
  let systemID = H5Tool.MD5(sysinfo);
  return systemID;
}

export function getSystemPKG() {
  const { pkg } = __APP_INFO__;
  return pkg;
}

/**
 * 用于路由，获取完整的相对路由
 * @param childPath
 * @param path
 * @returns
 */
export function getRouteURL(childPath: string, path: string = '/') {
  if (!childPath) return undefined;
  if (childPath.startsWith('/')) {
    if (childPath.startsWith(path)) return childPath;
    else return `${path}${childPath}`;
  } else {
    if(path==='/')
    return `${path}${childPath}`;
    else
    return `${path}/${childPath}`;
  }
}
/**
 * 检查是否存在默认‘/’路由，并添加
 * @param router 路由
 * @param firstItem 默认权限的第一个
 */
export function checkAddDefaultRoute(router:Router,firstItem:RouteRecordRaw)
{
  const routes=router.getRoutes()
  const defaultPath=routes.find(p=>p.path==='/');
  if(!defaultPath)
  {
    router.addRoute({
      name:'/',
      path:'/',
      redirect:firstItem.path
    })
  }
}
