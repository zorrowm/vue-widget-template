# xframelib

<p>
<a href="https://www.npmjs.com/package/xframelib" target="_blank">
 <img src="https://img.shields.io/npm/v/xframelib?color=orange&logo=npm" />
</a>
<a href="https://www.npmjs.com/package/xframelib" target="_blank">
 <img src="https://img.shields.io/npm/dt/xframelib?logo=npm"/>
</a>
</p>

## XFramelib前端基础库

> 核心实现一套 Widget机制的企业级微前端架构，积累与UI界面库无关的基础功能和组件，提升基础代码稳定性和高复用度，秉持来源于项目和服务于项目理念。

[README中文.md](./README_zh.md)  | [更新日志](https://share.note.youdao.com/s/MrahKIVA)

## 主要功能:

- Global.Config：对应public下的系统配置Sysconfig.js

- LayoutManager: 实现Widget调度机制

- Global.EventBus：公共事件总线

- UI组件：

  - LayoutContainer （Layout布局容器）
  - ScaleContainer（等比例整体缩放容器）
  - XWindow （仿window窗体组件）
  - SplitPanes（ 页面区域分割面板）
  - Popover（浮动面板）
  - RouterTransition相关组件

- 后端服务调用：

  - Http Web请求：Axios的封装实现Global.Axios、AxiosHelper{get, post, requestPost, requestGet, getData, requestPostBody} 
  - Hprose服务：Hprose Proxy方式调用后台hprose服务

- 常用基础功能：

  - H5Tool通用基础功能
  - IsTool类型判断工具（数字、字符串、对象、数组、函数等）
  - ValidateTool验证工具（身份证、手机号、IP地址、邮箱、密码强度判断、URL、车牌号等）
  - JQuery工具 （hasClass 、addClass、removeClass、toggleClass、setCssProperty）
  - 压缩解压工具类：ZipTool和GzipTool 
  - 缓存功能：StorageHelper 操作本地缓存对象、WebCacheTool前端缓存功能
  - XXTEA加密解密算法

- 指令：（使用setupDirectives进行注册加载指令）

  - v-wow  分块滚动显示
  - v-media 自适应样式
  - v-drag 可拖拽
  - v-repeatClick 避免重复点击
  - v-dc 双击指令

- 文件上传下载

  - BigFileDownload 大文件下载
  - FileUpload 大文件上传
  - FileDownload 普通文件下载封装，包括{ Download, SaveAs, JsonDownload, HttpDownload, DownloadByUrl }

- WebWorkers: 

  - iconvWorker  文本编码/解码
  - webCacheWorker 前端缓存层
  - xmathWorker 通用数学计算，前端大图片，瓦片化加载

- NavigatorPlugin浏览器插件（提供通用浏览器全局方法封装）

  

## 使用

`pnpm add xframelib`

or

`npm i xframelib`

全局引入库样式：

import 'xframelib/dist/index.css';

- 应用案例开源：**前端开发模板 vue-widget-template**

https://github.com/zorrowm/vue-widget-template

全面基于XFramelib和Widget思想的开发模板

- **main.ts 文件**
  In Typescript:

```js
import { createApp } from 'vue';
import App from './App.vue';
//模板添加的
import { setupRouter } from './router/index';
import {setupGlobDirectives} from './directives/index';
import { init, Global } from 'xframelib';
import 'xframelib/dist/index.css';
import { getSystemPKG, getSystemID } from '@/utils/sysTool';
import { createPinia } from 'pinia';
import { message } from 'ant-design-vue';
import {Icon} from '@iconify/vue';
//dev阶段打开，build注销
import 'ant-design-vue/dist/antd.css';


message.config({
  top: `100px`,
  duration: 1,
  maxCount: 3
});
//绑定消息和初始化xframe
//系统ID,唯一标识
const sysID = getSystemID();
//分组名，工程名
const sysGroup = getSystemPKG().name;
init(message, sysID, sysGroup);

// 创建pinia 实例
const pinia = createPinia();
const app = createApp(App);
// 挂载到 Vue 根实例上
app.use(pinia);
//定义v-drag命令
setupGlobDirectives(app);
setupRouter(app);
//注册全局组件
app.component('Icon',Icon);

app.mount('#app');

```

- **Quasar boot 使用示例**

```vue
import { boot } from 'quasar/wrappers';
import { addAPIProvider, Icon } from '@iconify/vue';
import { Dropdown } from 'floating-vue';
import { EmitLoadingInfo } from 'src/events/index';
import { autoRefresh } from 'src/utils/autoUpdate';
import { message } from 'src/utils/MessageNotify';
//封装的消息提示
import { getSystemID, getSystemPKG } from 'src/utils/sysTool';
import { Global, init } from 'xframelib';
function preInit() {

  //系统ID,唯一标识
  const sysID = getSystemID();
  //分组名，工程名
  const sysGroup = getSystemPKG().name;
  init(message, sysID, sysGroup);
  //挂载进度通知方法
  Global.Loading = EmitLoadingInfo;
  //注册自己的IconAPIProvider
  if (Global.Config?.ServiceURL.IconServiceURL)
    addAPIProvider('', {
      resources: [Global.Config?.ServiceURL.IconServiceURL]
    });
  else {
    //离线使用图标：生效，IconServiceURL配置为空
    import('../components/IconOffline').then((it) => {
      it.default();
    });
  }
}
export default boot(({ app }) => {
  EmitLoadingInfo('XFramelib库');
  //初始化Xframelib
  preInit();
  //启动热更新监测
  if (import.meta.env.DEV) autoRefresh();
  // 创建pinia 实例——20240221这里不需要了，在src/stores/index.ts里挂接的
  // const pinia = createPinia();
  // app.use(pinia);
  //注册全局组件
  app.component('Icon', Icon);
  app.component('VDropdown', Dropdown);
  // app.component('VTooltip', Tooltip);
  // app.component('VMenu', Menu);

  //开发时,全局注册tiny组件
  // if (import.meta.env.DEV) {
  //   // import('@opentiny/vue').then((it) => {
  //   //   const TinyVue = it.default;
  //   //   app.use(TinyVue);
  //   // });
  // }
  console.log('环境变量',process.env);
  //保存网站根地址
  app.config.globalProperties.$AppURL=process.env.APP_URL;
});

```

## 应用示例

![开发模版](https://zorrowm.github.io/npm/xframelib.png)

![maplibre加载大图](https://zorrowm.github.io/npm/bigImageWorkerExample.png)