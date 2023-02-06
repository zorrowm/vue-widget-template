<template>
  全局搜索:
  <a-input-search
    v-model:value="keyword"
    placeholder="请输入关键字"
    @search="doSearch(keyword)"
    :allowClear="true"
    style="width: 200px"
  />
  <a-button type="primary" @click="selectAll" style="float: right">
    选择全部数据添加到该服务
  </a-button>
  <a-table
    :row-selection="rowSelection"
    :columns="columns"
    :data-source="tableData"
    :pagination="false"
    rowKey="imagename"
    style="overflow: auto; margin-top: 10px"
  ></a-table>
  <Pagination
    style="text-align: right; margin-top: 10px"
    :totalCount="totalCount"
    :pagesize="PageSize"
    :pageindex="PageIndex"
    @pageChange="pageChange"
    @sizeChange="sizeChange"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted, watch, onUnmounted } from 'vue';
  import Pagination from '@/components/Pagination/index.vue';

  import ImageBatchService from '@/service/imageAdminDefault/ImageBatchService';
  import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
  import { Global } from 'xframelib';
  import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
  import TableEvent from '@/events/modules/TableEvent';
  const name = 'addServiceData';
  export default defineComponent({
    name,
    components: {
      Pagination
    },
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    setup(props) {
      //#region 对话框模板相关
      //确定或取消的处理方法
      function OkCancelHandler(isOk: boolean) {
        if (isOk) {
          onSubmit();
        } else {
          state.datasetDataList = [];
        }
      }
      onMounted(() => {
        //启动时监听
        OnEventHandler(name, OkCancelHandler);
      });
      onUnmounted(() => {
        OffEventHandler(name, OkCancelHandler);
      });
      //#endregion
      watch(
        () => props.data,
        val => {
          initTable();
        },
        {
          deep: true
        }
      );
      const state = reactive({
        searchValue: '',
        datasetDataList: [] as any,
        isFull: false
      });
      const tableState = reactive({
        tableData: [] as any,
        PageIndex: 1,
        PageSize: 10,
        totalCount: undefined,
        keyword: ''
      });
      const columns = [
        {
          title: '数据名称',
          dataIndex: 'imagename',
          align: 'center'
        }
      ];

      //全选
      const selectAll = () => {
        state.isFull = true;
        state.datasetDataList = [];
      };
      //搜索
      const doSearch = val => {
        initTable();
      };
      //监听当前页面条数
      const sizeChange = value => {
        tableState.PageSize = value;
        initTable();
      };
      //监听当前页数
      const pageChange = value => {
        tableState.PageIndex = value;
        initTable();
      };
      // 获取服务中不包含的项目数据;
      const initTable = () => {
        ServiceInfoService.GetDatasetImageinfoByServiceNameAsync(
          props.data.dataset,
          props.data.name,
          tableState.PageIndex,
          tableState.PageSize,
          tableState.keyword
        ).then(res => {
          //Global.Logger().info(res, 'res获取服务中不包含的项目数据');
          if (res != undefined) {
            tableState.tableData = res.arrayList;
            tableState.totalCount = res.totalCount;
          } else {
            Global.Message?.err('当前服务已无未添加数据!');
          }
        });
      };
      //复选框回调
      const rowSelection = {
        onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
          //Global.Logger().info(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          state.datasetDataList = selectedRows;
        },
        getCheckboxProps: (record: any) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name
        })
      };
      //添加数据确定
      const onSubmit = () => {
        //Global.Logger().info(state.datasetDataList);
        ImageBatchService.AddServiceDataAsync(
          props.data.name,
          state.datasetDataList,
          state.isFull
        ).then(res => {
          //Global.Logger().info(res, 'res添加数据确定');
          if (res === true) {
            Global.Message?.info('添加数据成功!');
            EmitMsg(TableEvent.RefeshTable, undefined);
            state.datasetDataList = [];
          } else {
            Global.Message?.err('添加数据失败!');
          }
        });
      };

      onMounted(() => {
        initTable();
      });
      return {
        selectAll,
        ...toRefs(state),
        ...toRefs(tableState),
        rowSelection,
        columns,
        pageChange,
        sizeChange,
        onSubmit,
        doSearch
      };
    }
  });
</script>
