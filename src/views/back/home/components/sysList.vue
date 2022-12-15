<template>
  <a-table
    :columns="columns"
    :pagination="false"
    rowKey="Id"
    :data-source="tableData"
    :expandedRowKeys="expandedRowKeys"
    @expandedRowsChange="expandedRowsChange"
    @expand="expand"
  >
    <template #expandedRowRender="{ record }">
      <a-spin :spinning="spinning">
      </a-spin>
    </template>
  </a-table>
</template>
<script lang="ts">
import {
GetFuncByRoleId, GetFuncsList, GetSystemsListByRole
} from "@/api/AuthService";
import { EmitMsg } from "@/events";
import SystemsEvent from "@/events/modules/SystemsEvent";
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";

export default defineComponent({
  props: {
    roleId: {
      type: String,
      default: "",
    },
  },
  components: {  },
  setup(props, { emit }) {
    const columns = [
      {
        title: "系统名称",
        dataIndex: "Name",
        ellipsis: true,
      },
      {
        title: "版本",
        dataIndex: "Version",
        width: 70,
      },
      {
        title: "描述",
        dataIndex: "Descreaption",
      },
    ];
    const replaceFields = {
      children: "Children",
      title: "Name",
      key: "Id",
    };
    const tableState = reactive({
      tableData: [] as any,
      keyword: "",
      PageIndex: 1,
      PageSize: 10,
    });
    const activeKey = ref("1");
    const spinning = ref<boolean>(false);
    const state = reactive({
      treeData1: [] as any,
      treeData2: [] as any,
      treeData3: [] as any,
      treeData4: [] as any,
      treeArr: {} as any,
      menuAuth: [] as any,
      WidgetMenuAuth: [] as any,
      widgetsAuth: [] as any,
      FunctionsAuth: [] as any,
      expandedRowKeys: [] as any,
    });
    const initTable = async () => {
      let res = await GetSystemsListByRole(props.roleId);
      //Global.Logger().debug(res, "角色下面的系统--");
      if (res.length > 0) {
        tableState.tableData = res;
        activeKey.value = tableState.tableData[0].Id + "1";
      } else {
        tableState.tableData = [];
      }
    };

    //获取所有功能
    const getFunc = async (id) => {
      let resu: any = await GetFuncsList(id);
      //Global.Logger().debug(resu, "所有功能");
      if (resu) {
        resu.Widgets = resu.Widgets.map((item) => {
          item.Name = item.Label;
          return item;
        });
        state.treeArr = resu;
        initTree();
      }
    };
    //获取该角色在系统下的权限
    const getRoleAuth = async (sysid) => {
      let res: any = await GetFuncByRoleId(props.roleId, sysid);
      //Global.Logger().debug(res, "获取该角色在某系统下面的权限---");
      //Global.Logger().debug(res.Menu, "res.Menu--");
      if (res.Menu) {
        for (let i = 0; i < res.Menu.length; i++) {
          res.Menu[i].Id = res.Menu[i].id;
          // state.menuAuth.push(res.Menu[i].Id);
          if (res.Menu[i].children.length > 0) {
            await getTreeChildrenId(res.Menu[i].children, state.menuAuth);
          } else {
            state.menuAuth.push(res.Menu[i].Id);
          }
        }
      }
      if (res.WidgetMenu) {
        for (let i = 0; i < res.WidgetMenu.length; i++) {
          res.WidgetMenu[i].Id = res.WidgetMenu[i].id;
          if (res.WidgetMenu[i].children.length > 0) {
            await getTreeChildrenId(
              res.WidgetMenu[i].children,
              state.WidgetMenuAuth
            );
          } else {
            state.WidgetMenuAuth.push(res.WidgetMenu[i].Id);
          }
          // state.WidgetMenuAuth.push(res.WidgetMenu[i].Id);
        }
      }
      if (res.Widgets) {
        for (let i = 0; i < res.Widgets.length; i++) {
          res.Widgets[i].Id = res.Widgets[i].id;
          if (res.Widgets[i].children.length > 0) {
            await getTreeChildrenId(res.Widgets[i].children, state.widgetsAuth);
          } else {
            state.widgetsAuth.push(res.Widgets[i].Id);
          }
          // state.widgetsAuth.push(res.Widgets[i].Id);
        }
      }
      if (res.Functions) {
        for (let i = 0; i < res.Functions.length; i++) {
          res.Functions[i].Id = res.Functions[i].id;
          if (res.Functions[i].children.length > 0) {
            await getTreeChildrenId(
              res.Functions[i].children,
              state.FunctionsAuth
            );
          } else {
            state.FunctionsAuth.push(res.Functions[i].Id);
          }
          // state.FunctionsAuth.push(res.Functions[i].Id);
        }
      }
      //Global.Logger().debug(state.menuAuth, "state.menuAuth--");
    };
    //递归push id
    const getTreeChildrenId = (arr, Auth) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i].Id = arr[i].id;
        // state.menuAuth.push(arr[i].Id);
        Auth.push(arr[i].Id);
      }
    };
    const initTree = () => {
      state.treeData1.push({
        Name: "全部",
        Children: state.treeArr.Menu,
        id: "0",
      });
      state.treeData2.push({
        Name: "全部",
        Children: state.treeArr.WidgetMenu,
        id: "0",
      });
      state.treeData3.push({
        Name: "全部",
        Children: state.treeArr.Widgets,
        id: "0",
      });
      state.treeData4.push({
        Name: "全部",
        Children: state.treeArr.Functions,
        id: "0",
      });
      spinning.value = !spinning.value;
    };
    //树选择事件
    const treeSelected = () => {};
    //树勾选事件
    const treeCheckeds = (val) => {
      //Global.Logger().debug(val, "树勾选事件--");
    };
    //展开行
    const expandedRowsChange = (expandedRows) => {
      state.expandedRowKeys = expandedRows;
      if (expandedRows.length > 1) {
        expandedRows.shift();
      }
    };
    //点击展开按钮触发的事件
    const expand = async (expanded, record) => {
      //Global.Logger().debug(expanded, "expanded-");
      if (expanded) {
        spinning.value = true;
        setTimeout(() => {
          EmitMsg(SystemsEvent.System_Detail, {
            sysid: record.Id,
            roleid: props.roleId,
          });
        }, 0);
        // await getFunc(record.Id);
        // getRoleAuth(record.Id);
      }
    };
    const emitSpin = (val: boolean) => {
      spinning.value = val;
    };
    onMounted(() => {
      initTable();
    });
    return {
      ...toRefs(tableState),
      ...toRefs(state),
      columns,
      activeKey,
      replaceFields,
      treeSelected,
      treeCheckeds,
      expandedRowsChange,
      expand,
      spinning,
      emitSpin,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.ant-table-thead > tr > th) {
  background-color: rgb(240, 242, 245) !important;
}
:deep(.ant-tree-child-tree-open) {
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
