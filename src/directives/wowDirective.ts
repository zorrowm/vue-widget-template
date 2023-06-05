/*
 * @Author: zorrowm zorrowm@126.com
 * @Date: 2023-06-03 09:13:06
 * @LastEditors: zorrowm zorrowm@126.com
 * @LastEditTime: 2023-06-04 18:02:54
 * @FilePath: \Feido三维开发模板\src\directives\wowDirective.ts
 * @Description:
 *
 * Copyright (c) 2023 by zorrowm , All Rights Reserved.
 */
import type { Directive, DirectiveBinding, App } from 'vue';

/**
 * 可拖拽命令
 */
const wowDirective: Directive = {
  mounted(el: Element | any, binding: DirectiveBinding) {
    const animateCofig = binding.value;
    el.style.visibility = 'hidden';
    el.style['animation-name'] = 'none';
    const offsetTop = function (element) {
      let top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while ((element = element.offsetParent)) {
        top += element.offsetTop;
      }
      return top;
    };
    const isMobile=() => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };
   const  innerHeight= function () {
    if (isMobile()) {
      // 判断 html元素对象内容的实际高度 > 浏览器窗口文档显示区域的高度
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    } else {
      return Math.min(document.documentElement.clientHeight, window.innerHeight);
    }
  }
    const isVisible = function (el) {
      const  viewTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop||el.parentNode.scrollTop;
      const viewBottom = viewTop + innerHeight();
      const top = offsetTop(el);
        // box 现在底部的位置
      const bottom = top + el.clientHeight;
      return top < viewBottom&&bottom >= viewTop;;
    };
    const isShow = function (el, animateCofig) {
      if (isVisible(el)) {
        el.style.visibility = 'visible';
        for (const name in animateCofig) {
          el.style[name] = animateCofig[name];
        }

        if(el.style['animation-name']!= 'none')
        {
           //动画默认为1s
          if(!el.style['animation-duration'])
          {
            el.style['animation-duration']='1s';
          }
        }
        el.parentNode.removeEventListener('scroll', fandelScroll);
      }
    };
    let lastClick = Date.now();
    const fandelScroll = function () {
      const rate = 100;
      if (Date.now() - lastClick >= rate) {
        isShow(el, animateCofig);
        lastClick = Date.now();
      }
    };
    setTimeout(function () {
      isShow(el, animateCofig);
    }, 1);

    el.parentNode.addEventListener('scroll', fandelScroll);
  },
};

export function setupWowDirective(app: App) {
  app.directive('wow', wowDirective);
}

export default wowDirective;
