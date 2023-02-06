<template>
  <div>
    <a-menu v-model:open-keys="openKeys" v-model:selected-keys="selectedKeys" mode="inline" :collapsed="collapsed"
      @click="clickMenuItem" class="menu">
      <template v-for="item in menus" :key="item.name">
        <menu-item :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { getRightRoutes } from '@/permission';
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { string } from 'vue-types';
import MenuItem from './menuItem.vue';
import {Global} from 'xframelib';
export default defineComponent({
  components: {
    MenuItem
  },
  props: {
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean
    },
    layoutName:string().def('BackLayout')//布局的路由名
  },
  setup(props) {
    // 当前路由
    const currentRoute = useRoute();
    const router = useRouter();
    //布局的路由名
    const layoutRouterName=props.layoutName;

    // 获取当前打开的子菜单
    const getOpenKeys = () => [currentRoute.matched[1]?.name];

    const state = reactive({
      openKeys: getOpenKeys(),
      selectedKeys: [currentRoute.name]
    });

    const menus = computed(() => {
      const rightRoutes = getRightRoutes(); //getRoutes(bussinessRoutes);
      if (!rightRoutes) return [];
      const resultItems = rightRoutes.find(item => item.name === layoutRouterName)?.children; //routes.find((item) => item.name === "BackLayout")!.children;
      if (resultItems) {
        const lastResult = resultItems.sort((a, b) => {
          let indexA: number = 0;
          let indexB: number = 0;
          if (a.meta && a.meta.index != undefined) {
            indexA = Number(a.meta.index);
          }
          if (b.meta && b.meta.index != undefined) {
            indexB = Number(b.meta.index);
          }
          return indexA - indexB;
        });
        return lastResult;
      } else return resultItems;
    });

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      newVal => {
        state.openKeys = newVal ? [] : getOpenKeys();
        state.selectedKeys = [currentRoute.name];
      }
    );

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name == 'login' || props.collapsed) return;
        state.openKeys = getOpenKeys();
        state.selectedKeys = [currentRoute.name];
        Global.Logger().debug(state.openKeys, 'openKeys');
      }
    );

    // 点击菜单
    const clickMenuItem = ({ item, key, keyPath }) => {
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        router.push({ name: key });
      }
    };

    return {
      ...toRefs(state),
      clickMenuItem,
      menus
    };
  }
});
</script>

<style lang="scss">
.menu {
  border-radius: 5px 0px 0px 5px;
  width: 100%;
  margin-left: 0px;
  background-color: var(--sider-menu-bg-color);
  color: var(--sider-menu-font-color);
}
</style>
