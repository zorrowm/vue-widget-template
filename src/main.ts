import  Logger  from '@/utils/Logger';
import { createApp } from 'vue';
import App from './App.vue';
//模板添加的
import { setupRouter } from './router/index';
import { init } from 'xframelib';
import 'xframelib/dist/index.css';
import { getSystemPKG, getSystemID } from '@/utils/sysTool';
import { createPinia } from 'pinia';
import { message } from 'ant-design-vue';
//dev阶段打开，build注销
import 'ant-design-vue/dist/antd.css';

if(window.global===undefined)
{
  window.global=globalThis;
}
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

  //测试
Logger('主页').warn('这是测试日志…………',app);
Logger('主页').warn('222……');

setupRouter(app);
app.mount('#app');
