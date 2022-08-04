import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { Global } from 'xframelib';
import { createRouterGuards } from './router-guards';
import 'nprogress/css/nprogress.css'; // 进度条样式
import common from '@/router/system';
import { App } from 'vue';

//添加路由模块
import mainLayout from '@/router/main';
import backLayout from '@/router/back';


// 当前业务视图路由，用于动态获取业务路由
export const bussinessRoutes: Array<RouteRecordRaw> = [mainLayout, backLayout];//
//用于初始化，只加载系统的路由
//IsNoLogin: true, 无需登录时，初始化全部路由
export const systemRoutes: Array<RouteRecordRaw> =Global.Config.UI.IsNoLogin?[...common, ...bussinessRoutes]: common;//[...common, ...bussinessRoutes]; //[mainLayout, backLayout, ...common];//全部路由

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(''),
  routes: systemRoutes
});

export function setupRouter(app: App) {
  app.use(router);
  if (!Global.Config.UI?.IsNoLogin)
    // 创建路由守卫
    createRouterGuards(router);
}
export default router;
