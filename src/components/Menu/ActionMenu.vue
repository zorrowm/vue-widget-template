<template>
  <div >
    <a-tooltip v-for="(item, index) in defaultMenus" placement="bottom" :title="item.name" :key="index">
      <a-popconfirm style="width:200px" title="确认删除？" @confirm="doClick(item.value)" v-if="item.isdelete">
        <Icon :icon="item.icon" class="operationIcon" />
      </a-popconfirm>

      <Icon v-else :icon="item.icon" class="operationIcon" @click="doClick(item.value)" />
    </a-tooltip>
    <a-dropdown placement="bottom" v-if="hasAppendMenus">
      <Icon icon='ant-design:ellipsis-outlined' class="operationIcon" />
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="(item, index) in appendMenus" :command="index" :key="index">
             <div style="width:110px">
              <a-popconfirm title="确认删除？" @confirm="doClick(item.value)" v-if="item.isdelete||item.value==='delete'">
                <Icon :icon="item.icon" class="operationIcon" />{{ item.name }}
              </a-popconfirm>
              <div v-else @click="doClick(item.value)">
                <Icon :icon="item.icon" class="operationIcon" />
                {{ item.name }}
              </div>
            </div>
          </a-menu-item>
        </a-menu>
      </template>
      <!-- <a-button>123</a-button> -->
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from "vue";
import {Icon} from '@iconify/vue'
import { array,any} from "vue-types";
export default defineComponent({
  components: {
    Icon
  },
  props: {
    defaultMenus: array<any>().def([]),
    appendMenus: array<any>().def([]),
    currentRow: any().def(null),
  },
  setup(props, { emit }) {
    const hasAppendMenus = computed(() => {
      return props.appendMenus.length > 0
    });
    const doClick = (eventName: string) => {
      emit("doActionClick", eventName, props.currentRow);
    };
    return {
      doClick,
      hasAppendMenus
    };
  },
});
</script>

<style scoped lang="scss">
.operationIcon {
  cursor: pointer;
  color: #1890ff !important;
  margin-left: 5px;
}
</style>
