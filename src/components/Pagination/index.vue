<template>
  <div>
    <a-pagination  
      show-size-changer
      v-model:current="current"
      v-model:pageSize="pageSize"
      :page-size-options="pageSizeOptions"
      :total="totalCount"
      @showSizeChange="onShowSizeChange"
      @change="onChange"
      :show-total="total => `总共 ${total}条`"
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
      //Global.Logger().info(props.pagesize, "props");
      // let pageSize = ref<any>(1);
      // let current = ref<any>(10);
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
        //Global.Logger().info("Page: ", pageNumber);
        emit('pageChange', pageNumber);
      };

      const onShowSizeChange = (current: number, pageSize: number) => {
        //Global.Logger().info(current, pageSize, "pagina");
        emit('sizeChange', pageSize);
      };
      watch(props, () => {
        //Global.Logger().info(props, "props");
        state.pageSize = props.pagesize;
        state.current = props.pageindex;
        state.totalCount = props.totalCount;
        //Global.Logger().info("state", state);
      });
      return {
        onShowSizeChange,
        ...toRefs(state),
        onChange,
        pageSizeOptions
      };
    }
  });
</script>
