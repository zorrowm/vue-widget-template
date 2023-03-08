<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-sub-menu v-if="menuInfo.children?.length" :key="menuInfo.name" v-bind="$attrs">
      <template v-slot:title>
        <span class="anticon">
          <Icon :icon="menuInfo.meta.icon"></Icon>
        </span>
        <span class="iconClass">{{ menuInfo.meta.title }}</span>
      </template>
      <template v-for="item in getSortedItems(menuInfo.children)" :key="item.name">
        <template v-if="!item.children">
          <a-menu-item :key="item.name">
            <span style="padding-left: 15px">{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item :menu-info="item" :key="item.name"></menu-item>
        </template>
      </template>
    </a-sub-menu>
    <a-menu-item v-else :key="menuInfo.name">
      <span class="anticon">
        <!-- <Icon :icon="menuInfo.meta.icon"></Icon>-->
        <Icon :icon="menuInfo.meta.icon"></Icon>
      </span>
      <span class="iconClass">{{ menuInfo.meta.title }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { Icon } from "@iconify/vue";
import { defineComponent } from 'vue';
import { object } from "vue-types";
export default defineComponent({
  name: 'menu-item',
  components: {
    Icon,
  },
  props: {
    menuInfo: object()
  },
  setup(props) {

    function getSortedItems(resultItems: RouteRecordRaw[]) {
      const lastResult = resultItems?.sort((a, b) => {
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
    }
    return {
      getSortedItems
    };
  }
});
</script>

<style>
.iconClass {
  margin-left: 3px;
  font-weight: 600;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  /* background-color: transparent !important; */
  background-color: var(--sider-menu-selected-bgcolor);
  color:var( --sider-menu-selected-fontcolor);
}
</style>
