import { createApp } from "vue";
import App from "./App.vue";
//模板添加的
import { setupRouter } from "./router/index";
import { setupGlobDirectives } from "./directives/index";
import { init, Global } from "xframelib";
import "xframelib/dist/index.css";
//tooltip库
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { getSystemPKG, getSystemID } from "@/utils/sysTool";
import { createPinia } from "pinia";
import { message } from "ant-design-vue";
import { Icon } from "@iconify/vue";

if (window.global === undefined) {
  window.global = globalThis;
}
message.config({
  top: `100px`,
  duration: 1,
  maxCount: 3,
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
app.component("Icon", Icon);

app.mount("#app");
