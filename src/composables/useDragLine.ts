import type { MenuSetting } from '#/config';
import { appStore } from '@/store';
import { debounce } from 'lodash-es';
import type { Ref } from 'vue';
import { computed, nextTick, onMounted, unref } from 'vue';

//最小值
const MiniBarWidthNumber = 48;

function setMenuSetting(menuSetting: Partial<MenuSetting>) {
  //store.dispatch('appState/setProjectConfig', { menuSetting });
  const appStoreState = appStore();
  appStoreState.setProjectConfig({ menuSetting });
}
const getCollapsed = computed(() => {
  const appStoreState = appStore();
  return appStoreState.projectConfig?.menuSetting.collapsed;
});
/**
 * Handle menu drag and drop related operations
 * @param siderRef
 * @param dragBarRef
 */
export function useDragLine(siderRef: Ref<any>, dragBarRef: Ref<any>, mix = false) {
  onMounted(() => {
    nextTick(() => {
      const exec = debounce(changeWrapWidth, 10);
      exec();
    });
  });

  function getEl(elRef: Ref<ElRef | ComponentRef>): any {
    const el = unref(elRef);
    if (!el) return null;
    if (Reflect.has(el, '$el')) {
      return (unref(elRef) as ComponentRef)?.$el;
    }
    return unref(elRef);
  }

  function handleMouseMove(ele: HTMLElement, wrap: HTMLElement, clientX: number) {
    document.onmousemove = function (innerE) {
      let iT = (ele as any).left + (innerE.clientX - clientX);
      innerE = innerE || window.event;
      const maxT = 800;
      const minT = MiniBarWidthNumber; //unref(getMiniWidthNumber);
      iT < 0 && (iT = 0);
      iT > maxT && (iT = maxT);
      iT < minT && (iT = minT);
      ele.style.left = wrap.style.width = iT + 'px';
      return false;
    };
  }

  // Drag and drop in the menu area-release the mouse
  function removeMouseup(ele: any) {
    const wrap = getEl(siderRef);
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      wrap.style.transition = 'width 0.2s';
      const width = parseInt(wrap.style.width);

      if (!mix) {
        const miniWidth = unref(MiniBarWidthNumber);
        if (!unref(getCollapsed)) {
          width > miniWidth + 20
            ? setMenuSetting({ menuWidth: width })
            : setMenuSetting({ collapsed: true });
        } else {
          width > miniWidth && setMenuSetting({ collapsed: false, menuWidth: width });
        }
      } else {
        setMenuSetting({ menuWidth: width });
      }
      ele.releaseCapture?.();
    };
  }

  function changeWrapWidth() {
    const ele = getEl(dragBarRef);
    if (!ele) {
      return;
    }
    const wrap = getEl(siderRef);
    if (!wrap) {
      return;
    }
    ele.onmousedown = (e: any) => {
      wrap.style.transition = 'unset';
      const clientX = e?.clientX;
      ele.left = ele.offsetLeft;
      handleMouseMove(ele, wrap, clientX);
      removeMouseup(ele);
      ele.setCapture?.();
      return false;
    };
  }

  return {};
}
