import type { Directive, DirectiveBinding,App } from 'vue';

/**
 * 可拖拽命令
 */
const dragDirective: Directive = {
    mounted(el: Element|any, binding:DirectiveBinding) {
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
    }
  };
  
  export function setupDragDirective(app: App) {
    app.directive('drag', dragDirective);
  }
  
  export default dragDirective;