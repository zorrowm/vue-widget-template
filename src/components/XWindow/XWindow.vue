<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div
      v-if="isLoad"
      v-show="isShow"
      ref="dragPanelRef"
      v-drag
      class="dragWindowPanel"
    >
      <div class="dragPanelTitle">
        <slot name="title">
          <img v-if="props.icon" :src="props.icon" width="24" height="24" />
          <span v-if="props.title" class="paneltitle">{{ props.title }}</span>
        </slot>
        <div class="dragPanelBar">
          <Icon icon="ant-design:minus-outlined" @click="showHidePanel" />
          <Icon :icon="resizeIcon" @click="resizePanel" />
          <Icon icon="ant-design:close-outlined" @click="close" />
        </div>
      </div>
      <div class="dragPanelContent">
        <slot name="default">  </slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { H5Tool, isNumber, uuid } from 'xframelib';
import { IPanelData, addWindowPanel, removeWindowPanel } from './XWindowModel';

const id = uuid();
/**
 * 定义外部参数
 */
const props = defineProps({
  top: {
    type: [String, Number],
    default: '0px',
  },
  left: {
    type: [String, Number],
    default: '0px',
  },
  nWidth: {
    type: [String, Number],
    default: '300px',
  },
  nHeight: {
    type: [String, Number],
    default: '400px',
  },
  icon: {
    //窗体图标
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  titleHeight: {
    type: [String, Number],
    default: '40px',
  },
  //widget组件ID;父组件ID
  pid: {
    type: String,
    default: '',
  },
  //附加对象
  tag:{
    type:[String,Array,Object,Number],
    default:''
  }
});
/**
 * 定义对外事件
 */
const emit = defineEmits(['close', 'open','loaded', 'visibleChanged']);
//容器
const dragPanelRef = ref();

function getPanelData(data?: any): IPanelData {
  const panelData = {
    id,
    icon: props.icon,
    title: props.title,
    pid: props.pid,
    data: data,
  };
  return panelData;
}
//#region 面板相关操作功能
const isShow = ref(true);
const isMaxPanel = ref(false);
const isLoad = ref(true);
function showHidePanel() {
  isShow.value = !isShow.value;
  emit('visibleChanged', getPanelData(isShow.value));
  //  if(!isShow.value)
  //  {
  //  smallIcons.value.push(1);
  //  }
  //  else
  //  {
  //    smallIcons.value.pop();
  //  }
}
/**
 * 关闭当前面板
 */
function close() {
  emit('close', getPanelData(false));
  removeWindowPanel(id);
  isLoad.value = false;
}
/**
 * 重新加载当前面板
 */
function open() {
  emit('open', getPanelData(true));
  isLoad.value = true;
}
const resizeIcon = computed(() => {
  return isMaxPanel.value
    ? 'fluent:resize-small-24-regular'
    : 'fluent:resize-large-24-regular';
});

let currentTop: any = props.top;
let currentLeft: any = props.left;
/**
 * 改变窗体大小
 */
function resizePanel() {
  isMaxPanel.value = !isMaxPanel.value;
  if (isMaxPanel.value) {
    //保存当前位置，便于后面恢复
    if (dragPanelRef.value) {
      currentTop = dragPanelRef.value.style.top;
      currentLeft = dragPanelRef.value.style.left;
    }
    setPanelSize('100%', '100%');
    setPanelPostion(0, 0);
  } else {
    setPanelPostion(currentTop, currentLeft);
    setPanelSize(props.nWidth, props.nHeight);
  }
}
/**
 * 初始化大小和位置
 */
function initSizePosition() {
  setPanelPostion(props.top, props.left);
  setPanelSize(props.nWidth, props.nHeight);
}

function setPanelSize(width: number | string, height: number | string) {
  const tmpWidth: string = isNumber(width) ? width + 'px' : width;
  const tmpHeight: string = isNumber(height) ? height + 'px' : height;
  H5Tool.setCssVar('--drag-panel-width', tmpWidth, dragPanelRef.value);
  H5Tool.setCssVar('--drag-panel-height', tmpHeight, dragPanelRef.value);
}
function setPanelPostion(top: number | string, left: number | string) {
  if (dragPanelRef.value) {
    const tmpTop: string = isNumber(top) ? top + 'px' : top;
    const tmpLeft: string = isNumber(left) ? left + 'px' : left;
    dragPanelRef.value.style.top = tmpTop;
    dragPanelRef.value.style.left = tmpLeft;
  }
}

function initTitleHeight() {
  const tmpTitleHeight: string = isNumber(props.titleHeight)
    ? props.titleHeight + 'px'
    : props.titleHeight;
  H5Tool.setCssVar(
    '--drag-panel-title-height',
    tmpTitleHeight,
    dragPanelRef.value
  );
}
//#endregion

//对外暴露的方法和属性
const exposeObject = { id, isShow, close, open, showHidePanel };
defineExpose(exposeObject);

function init() {
  const panelData = getPanelData(exposeObject);
  //加入字典集合
  addWindowPanel(panelData);
  emit('loaded',panelData);//初始化了
}
onMounted(() => {
  initSizePosition();
  initTitleHeight();
  init();
});
</script>

<style lang="scss" scoped>
.iconify {
  color: #000;
}
.dragWindowPanel {
  position: absolute;
  width: var(--drag-panel-width);
  height: var(--drag-panel-height);
  background-color: #ddd;
  z-index: 10;
  border-radius: 6px;

  .dragPanelTitle {
  width: 100%;
  height: var(--drag-panel-title-height);
  background-color: #eee;
  border-radius: 5px 5px 0 0;

  .paneltitle {
    font-size: 18px;
    line-height: var(--drag-panel-title-height);
    margin-left: 10px;
    text-wrap: nowrap;
    overflow: hidden;
  }
}

.dragPanelBar {
  position: relative;
  float: right;
  right: 5px;
  width: 70px;
  height:100%;
  display: flex;
  align-items: center;
  // justify-items:center;
  justify-content: space-between;
  svg:hover {
    border: 1px solid #333;
  }
}

.dragPanelContent {
  margin-top: 1px;
  background-color: #eee;
  height:calc(100% - var(--drag-panel-title-height));
  overflow-x: hidden;
  overflow-y: auto;
}
}
</style>
