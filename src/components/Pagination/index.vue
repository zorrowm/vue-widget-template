<template>
  <div style="maring: 10px 0px">
    <a-pagination
      show-size-changer
      v-model:current="current"
      v-model:pageSize="pageSize"
      :page-size-options="pageSizeOptions"
      :total="totalCount"
      @showSizeChange="onShowSizeChange"
      @change="onChange"
    >
      <template #buildOptionText="pagesize">
        <span>{{ pagesize.value }}条/页</span>
      </template>
    </a-pagination>
  </div>
</template>
<script lang="ts">
import { number,bool } from "vue-types";
import {defineComponent,ref,reactive,watch,toRefs} from 'vue'
  export default defineComponent({
    props: {
      pageindex: number(),
      pagesize: number(),
      totalCount: number(),
      isCard:bool()
    },
    setup(props, { emit }) {
      let pageSizeOptions = ref<string[]>();
      if (props.isCard === true) {
        pageSizeOptions = ref<string[]>(['8', '16', '24', '32']);
      } else {
        pageSizeOptions = ref<string[]>(['10', '20', '30', '40']);
      }

      const state: any = reactive({
        totalCount: props.totalCount,
        pageSize: props.pagesize,
        current: props.pageindex
      });
      //跳转页面
      const onChange = (pageNumber: number) => {
        emit('pageChange', pageNumber);
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        emit('sizeChange', pageSize);
      };
      watch(props, () => {
        state.pageSize = props.pagesize;
        state.current = props.pageindex;
        state.totalCount = props.totalCount;
      });
      return {
        // pageSize,
        // current,
        onShowSizeChange,
        ...toRefs(state),
        onChange,
        pageSizeOptions
      };
    }
  });
</script>
