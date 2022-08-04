<template>
  <a-form>
    <a-form-item label="搜索用户">
      <a-input-search
        v-model:value="searchValues"
        placeholder="请输入用户id或者用户名"
        style="width: 250px; margin-right: 30px"
        @search="Search"
        :allowClear="true"
      />
    </a-form-item>
  </a-form>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="false"
    rowKey="Id"
    bordered
    :scroll="{ y: 220 }"
    :bordered="false"
  >
    <template #operation="{ record }">
      <ActionMenu :currentRow="record" @doActionClick="doActionClick" :ifEditRole="true" />
    </template>
  </a-table>
  <a-modal
    v-model:visible="modalVis"
    :title="modalTitle"
    :footer="null"
    :keyboard="false"
    :destroyOnClose="true"
  >
    <RoleEdit v-if="modalTitle == '编辑角色'" :rowData="rowData" @userInfoSubmit="modalCallBack" />
  </a-modal>
</template>

<script lang="ts">
  import { GetUserInfoByName } from '@/api/AuthService';
  import ActionMenu from '@/components/menu/ActionMenu.vue';
  import RoleEdit from './RoleEdit.vue';
  
  export default defineComponent({
    props: {},
    components: {
      ActionMenu,
      RoleEdit
    },
    emits: ['userInfoSubmit'],
    setup(props, { emit }) {
      const columns = [
        {
          title: '姓名',
          dataIndex: 'Realname',
          width: 100
        },
        {
          title: '用户名',
          dataIndex: 'Name',
          width: 120
        },
        {
          title: '创建人',
          dataIndex: 'CreateName',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'Cjsj'
        },
        {
          title: '操作',
          align: 'center',
          width: 100,
          slots: { customRender: 'operation' }
        }
      ];
      const state = reactive({
        searchValues: '' as any,
        rowData: {} as any,
        modalVis: false,
        modalTitle: ''
      });
      const tableState = reactive({
        tableData: [] as any
      });
      //搜索
      const Search = async () => {
        let res = await GetUserInfoByName(state.searchValues);
        //console.log(res, '精准查询--');
        if (res) {
          tableState.tableData.push(res);
          state.searchValues = undefined;
        } else {
          Global.Message?.err('没有此用户');
        }
      };
      //表格操作
      const doActionClick = (val, row) => {
        switch (val) {
          case 'roleEdit':
            editRoleInfo();
            break;
        }
        state.rowData = row;
      };
      //编辑角色
      const editRoleInfo = () => {
        state.modalVis = true;
        state.modalTitle = '编辑角色';
      };
      //modal框取消
      const modalCallBack = val => {
        if (val) state.modalVis = false;
        emit('userInfoSubmit', true);
      };
      onMounted(() => {});
      return {
        ...toRefs(state),
        columns,
        ...toRefs(tableState),
        Search,
        doActionClick,
        modalCallBack
      };
    }
  });
</script>

<style lang="scss" scoped>
  :deep(.ant-table-body) {
    overflow-y: auto;
  }
  :deep(.ant-table-placeholder) {
    height: 100px;
    .ant-empty-normal {
      margin: 0px !important;
    }
  }
</style>
