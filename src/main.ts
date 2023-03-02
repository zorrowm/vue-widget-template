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

// fs.writeFile("./MenuRoutes.json" ,"12345");
// const fullPath=path.join(__dirname, "hello_world.txt");

// const writeStream = new fsm.WriteStream("MenuRoutes.json");
// writeStream.write('646546545465');
// fs.writeFile("MenuRoutes.json" ,"12345");
// writeFileSync(join(__dirname, "MenuRoutes.json"), "13216464", {
//   flag: 'w',
// });
// 创建pinia 实例
const pinia = createPinia();
const app = createApp(App);
// 挂载到 Vue 根实例上
app.use(pinia);
//定义v-drag命令
setupGlobDirectives(app);
setupRouter(app);
app.mount('#app');
