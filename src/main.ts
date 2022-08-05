import { createApp } from 'vue';
import App from './App.vue';
//模板添加的
import { setupRouter } from './router/index';
import { init } from 'xframelib';
import 'xframelib/dist/index.css';
import { message } from 'ant-design-vue';
//dev阶段打开，build注销
import 'ant-design-vue/dist/antd.css';
import { getSystemPKG, getSystemID } from '@/utils/sysTool';
import { createPinia } from 'pinia';

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
//注册全局常用的ant-design-vue组件
if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.js').then(it => {
    app.use(it.default);
  });
}

setupRouter(app);
app.mount('#app');
