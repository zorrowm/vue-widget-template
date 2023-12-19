<template>
  <div class="sidemenu">
    <a href="#/"><div class="logocontent"></div></a>
    <sidemenu></sidemenu>
    <div class="bottomMenu">
      <div title="同步/保存" class="vitem">
        <Icon icon="ant-design:cloud-sync-outlined" color="#fff" />
        <span>保存</span>
      </div>
      <div title="分享" class="vitem" >
        <Icon
          icon="ant-design:share-alt-outlined"
          width="36"
          height="36"
          color="#fff"
        />
        <span>分享</span>
      </div>
      <div title="下载样式" class="vitem">
        <Icon icon="ant-design:cloud-download-outlined" color="#fff" />
        <span>下载</span>
      </div>
      <div v-tooltip="'退出'" class="vitem" >
        <Icon icon="ant-design:logout-outlined" color="#fff" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sidemenu from "./menu.vue";
</script>

<style lang="scss" scoped>
.sidemenu {
  // background: url("/img/bgmenu.png") no-repeat;
  // background-size: 100% 100%;
  background-color: #014099; //$sider-dark-bg-color;
  width: 100%;
  height: 100%;
  border-right: 1px solid #f0f0f0; 
}
:deep(.ant-menu-inline, .ant-menu-vertical, .ant-menu-vertical-left)
{
  border-right: unset;
}
.logocontent {
  background-color: #014099; //$sider-dark-bg-color;
  background-image: url(/img/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50% 50%;
  width: 100%;
  height: 48px;
  // &:hover {
  //   background-color: rgba(60, 22, 231, 0.842);
  // }
}
.bottomMenu {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  bottom: 10px;
  width: 100%;
  height: 180px;
  // background-color: blue;
}
.vitem {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40px;
  line-height: 20px;
  margin-top: 10px;
  color: #999;
  font-size: 12px;
  font-weight: 550;
  &:hover {
    cursor: pointer;
    color: #fff;
  }
}
</style>
