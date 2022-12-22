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
//定义v-drag命令
app.directive("drag", {
  mounted: function (el: any, binding: any, vnode: any) {
      const value = binding.value;
      const moveContainer =
          (value && value.container && document.querySelector(value.container)) ||
          document.querySelector("#map3dContainer") ||
          document.body;
      const selector =
          (value && value.selector && el.querySelector(value.selector)) ||
          el.querySelector(".drag-el") ||
          el;
      if (selector !== el) {
          selector.classList.add("ls-draggable");
      }
      selector.onmousedown = function (e: any) {
          el.style.transition = "none";
          const disx = e.clientX - el.offsetLeft;
          const disy = e.clientY - el.offsetTop;
          const mw = moveContainer.offsetWidth;
          const mh = moveContainer.offsetHeight;
          const ew = el.offsetWidth;
          const eh = el.offsetHeight;
          // 点击后将当前组件置顶
          if (el.style.zIndex !== "100") {
              el.style.zIndex =100;
          }
          moveContainer.onmousemove = function (e: any) {
              let left = e.clientX - disx;
              let top = e.clientY - disy;
              if (left < 0) {
                  left = 0;
              }
              if (top < 0) {
                  top = 0;
              }
              if (left > mw - ew) {
                  left = mw - ew;
              }
              if (top > mh - eh) {
                  top = mh - eh;
              }
              el.style.left = left + "px";
              el.style.top = top + "px";
          };
          moveContainer.onmouseup = function (e: any) {
              // const left = e.clientX - disx;
              // const top = e.clientY - disy;
              moveContainer.onmousemove = moveContainer.onmouseup = null;
              el.style.transition = "all 0.3s";
          };
      };
  },
});
setupRouter(app);
app.mount('#app');
