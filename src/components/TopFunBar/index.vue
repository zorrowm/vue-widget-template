<template>
  <div class="topBox">
    <span class="toptitle">{{ title }}</span>
    <span class="topright">
      <a-input-search v-model:value="searchValue" placeholder="请输入关键字" style="width: 200px; margin-right: 30px"
        class="rightBoxItem" @search="doClick('searchWord')" :allowClear="true" />
      <a-button type="primary" class="rightBoxItem" style="margin-right: 10px" @click="doClick('creatNew')"
        v-if="ifTask">
        <template #icon>
          <Icon icon="ant-design:plus-outlined" />
        </template>
        新建
      </a-button>

      <a-divider type="vertical" v-if="ifTask" />
      <a-tooltip placement="bottom" title="批量删除" v-if="ifTask">
        <a-popconfirm title="确认删除？" @confirm="doClick('batchDelete')">
          <Icon icon="ant-design:delete-outlined" style="margin-right: 20px" />
        </a-popconfirm>
      </a-tooltip>
      <a-tooltip placement="bottom" title="刷新">
        <Icon icon="ant-design:sync-outlined" @click="doClick('refresh')" />
      </a-tooltip>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted} from 'vue';

import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'topFunBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    ifTask: {
      type: Boolean,
      default: true
    }
  },
  components: { Icon },
  setup(props, { emit }) {
    const router = useRouter();
    const state = reactive({
      searchValue: ''
    });
    //点击事件
    const doClick = (val: string) => {
      if (val === 'searchWord') {
        emit('topBarClick', val, state.searchValue);
      } else {
        emit('topBarClick', val);
      }
    };
    onMounted(() => { });

    return {
      ...toRefs(state),
      doClick
    };
  }
});
</script>
<style lang="scss" scoped>
.toptitle {
  font-weight: bold;
}

.topright {
  float: right;
}

.topBox {
  height: 50px;
  padding: 10px;
}
</style>
