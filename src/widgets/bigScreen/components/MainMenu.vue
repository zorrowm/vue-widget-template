<template>
  <a-menu
    mode="horizontal"
    :multiple="true"
    @select="selectMenuItem"
    @deselect="deselectMenuItem"
    @click="clickMenuItem"
    v-model:selectedKeys="selectedMenuKeys"
  >
    <template v-for="(menuInfo, index) in defaultMenus" key="index">
      <a-sub-menu v-if="!menuInfo.path" :key="menuInfo.name">
        <template v-slot:title>
          <span class="anticon" v-if="menuInfo.icon">
            <i :class="menuInfo.icon"></i>
          </span>
          <span class="iconClass">{{ menuInfo.name }}</span>
        </template>
        <a-menu-item v-for="(item, childindex) in menuInfo.children" :key="item.path">
          <span>{{ item.name }}</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="menuInfo.path">
        <span class="anticon" v-if="menuInfo.icon">
          <i :class="menuInfo.icon"></i>
        </span>
        <span class="iconClass">{{ menuInfo.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script lang="ts">
  import { MenuItemEnum } from '@/enums/menuEnum';
  import { OnEventHandler } from '@/events';
  import menuSetting from '@/settings/widgetMenuSetting/index';
  import { defineComponent, onMounted, ref, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Global, isObjectX } from 'xframelib';
  import { findMenuConfig } from '@/widgets/WidgetUtils';
  export default defineComponent({
    setup() {
      const defaultMenus = ref(menuSetting);
      const selectedMenuKeys = ref([]);
      const router = useRouter();
      // 点击菜单
      const clickMenuItem = ({ key }) => {
        const menuItem = key;
        if (menuItem.type === MenuItemEnum.URL) {
          window.open(key.path, '_blank');
        } else if (menuItem.type === MenuItemEnum.Route) {
          if (menuItem.blank) {
            let routeData = router.resolve({
              path: menuItem.path
            });
            window.open(routeData.href, '_blank'); //新标签打开
          } else router.push({ path: menuItem.path }); //本地跳转
        }
      };
      const selectMenuItem = ({ key }) => {
        const menuItem = findMenuConfig(menuSetting, key);
        console.log('选中对象：', menuItem);
        if (isObjectX(menuItem)) {
          if (menuItem.type === MenuItemEnum.Widget) {
            const loaded = Global.LayoutManager?.isWidgetLoaded(menuItem.path);
            if (!loaded) {
              Global.LayoutManager?.loadWidget(menuItem.path); //加载
            } else {
              Global.LayoutManager?.changeWidgetVisible(menuItem.path, true);
            }
            // console.log('当前选中KEY', selectedMenuKeys.value);
          }
        }
      };
      const deselectMenuItem = ({ key }) => {
        console.log('取消选中：', key);
        const menuItem = findMenuConfig(menuSetting, key);
        console.log('取消选中对象：', menuItem);
        if (menuItem.type === MenuItemEnum.Widget) {
          const loaded = Global.LayoutManager?.isWidgetLoaded(menuItem.path);
          if (loaded) {
            if (menuItem.unload) {
              Global.LayoutManager?.unloadWidget(menuItem.path);
            } else Global.LayoutManager?.changeWidgetVisible(menuItem.path, false);
          }
        }
        // console.log('移除选中KEY,不选中……');
        // //移除选中KEY,不选中
        // selectedMenuKeys.value.splice(selectedMenuKeys.value.indexOf(key), 1);
      };
      function removeSelectedKey(id: string) {
        //console.log(id, selectedMenuKeys.value, "removeSelectedKey");
        const len = selectedMenuKeys.value.length;
        let m = -1;
        for (let i = 0; i < len; i++) {
          const item = selectedMenuKeys.value[i];
          if (item === id) {
            m = i;
            break;
          }
        }
        if (m >= 0) {
          selectedMenuKeys.value.splice(m, 1);
        }
      }
      onMounted(() => {
        //更改菜单状态
        // OnEventHandler(SystemEvents.WidgetClosed, removeSelectedKey);
      });
      return {
        clickMenuItem,
        defaultMenus,
        selectMenuItem,
        deselectMenuItem,
        selectedMenuKeys
      };
    }
  });
</script>
<style lang="scss">
  .ant-menu {
    background: transparent;
    color: #fff;
    font-size: 14px;
    &.ant-menu-horizontal {
      line-height: 40px;
      border-bottom: unset;
      > .ant-menu-item-selected,
      .ant-menu-submenu-selected {
        color: #15e9f1 !important;
        background-image: url('../img/home/bottomHeightBack.png') !important;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    &.ant-menu-item,
    .ant-menu-submenu {
      padding: 0 10px !important;
    }
  }

  .ant-menu-overflow {
    display: flex;
    justify-content: center;
  }
  .ant-menu-item-selected::after,
  .ant-menu-submenu-selected::after {
    border-bottom: unset !important; //2px solid #ff2718 !important;
  }
  .ant-menu-submenu-popup > .ant-menu {
    background-color: transparent;
  }
  .ant-menu-submenu > .ant-menu {
    //background-color: transparent !important;
    border-radius: 2px;
    margin: 0 0 0 -20px;
  }
  .ant-menu-vertical {
    margin-bottom: -20px;
    .ant-menu-item {
      width: 150px;
      height: 30px;
      line-height: 30px;
      background-color: unset !important;
      &:hover {
        background-color: #fff !important;
      }
    }
    .ant-menu-item-selected {
      color: #15e9f1 !important;
      background-color: #01224b !important;
    }
    .ant-menu-item:not(:last-child) {
      margin-bottom: -5px !important;
    }
  }
</style>
