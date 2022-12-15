<template>
  <div style="overflow:hidden;margin:0 5px">
    <div class="tableContent" :style="contentStyle">
      <a-table :columns="columns" :data-source="tableData" :pagination="false" rowKey="Id"
        :scroll="{ x: 1000, y: clientHeight - 220 }">
        <template #bodyCell="{ text, column, record }">
          <v-switch :case="column.key" v-if="column.key">
            <template #operation>
              <ActionMenu :currentRow="record" @doActionClick="doActionClick"
                :default-menus="getRightDefaultMenus(record)" :append-menus="getRightMoreMenus(record)" />
            </template>
            <template #islocked>
              <a-switch v-model:checked="record.Islocked" @change="changeLock(record)" size="small" />
            </template>
            <template #Role>
              <a-popover placement="leftTop">
                <template #content>
                  <p>{{ record.Role.Name }}</p>
                </template>
                {{ record.Role.Name }}
                >
              </a-popover>
            </template>
            <template #RoleUser>
              <span v-for="(item, index) in record.UserRoles" @click="ViewRole(item)"
                v-if="record.UserRoles.length <= 3">
                <a v-if="index != record.UserRoles.length - 1">{{ item.Role.Name }},</a>
                <a v-else>
                  {{ item.Role.Name }}
                </a>
              </span>
              <span v-else>
                <span v-for="(item, index) in record.UserRoles.slice(0, 3)" @click="ViewRole(item)">
                  <a v-if="index != record.UserRoles.slice(0, 3).length - 1">{{ item.Role.Name }},</a>
                  <a v-else>
                    {{ item.Role.Name }}
                  </a>
                </span>
                <span>
                  <a-dropdown placement="bottom">
                    <Icon icon='ant-design:ellipsis-outlined' style="color: rgb(144, 144, 255)" />
                    <template #overlay>
                      <a-menu>
                        <a-menu-item v-for="(item, index) in record.UserRoles.slice(3)" :command="index" :key="index">
                          <div @click="ViewRole(item)">
                            {{ item.Role.Name }}
                          </div>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </span>
              </span>
            </template>
          </v-switch>
        </template>
      </a-table>
      <Pagination style="text-align: right;" :totalCount="totalCount" :pagesize="PageSize" :pageindex="PageIndex"
        @pageChange="pageChange" @sizeChange="sizeChange" />
    </div>

    <ModalContainer :width="700" :content="modalContentRef" :visible="modalVisibleRef" :data="recordData"
      :extra="extraRef" />
  </div>
</template>

<script lang="ts">
import {
computed, defineComponent, onMounted, onUnmounted, reactive, ref, shallowRef, toRefs
} from "vue";
// import TopFunBar from "@/components/topFunBar/index.vue";
import {
GetUsersList, GetUsersListByRoleOrSystem, LockedUserList
} from "@/api/AuthService";
import ActionMenu from "@/components/Menu/ActionMenu.vue";
import { loadModal } from '@/components/ModalContainer';
import ModalContainer from '@/components/ModalContainer/index.vue';
import Pagination from "@/components/Pagination/index.vue";
import VSwitch from "@/components/VSwitch.vue";
import { OffEventHandler, OnEventHandler } from '@/events';
import TableEvent from '@/events/modules/TableEvent';
import { userStore,appStore } from '@/store';
import { getDefaultMenus, getMoreMenus } from './models/ActionMenus';
import { columns } from './models/TabColumns';
import {Icon} from '@iconify/vue';
import {storeToRefs} from 'pinia'
import {Global} from 'xframelib'
export default defineComponent({
  name: "userManage",
  components: {
    // TopFunBar,
    Pagination,
    ActionMenu,
    ModalContainer,
    Icon,
    VSwitch
  },
  setup(props, { emit }) {
    const userState = userStore();
    const appState = appStore();
    const { layoutContentHeight,layoutContentWidth } = storeToRefs(appState);

    const tableState = reactive({
      tableData: [] as any,
      PageIndex: 1,
      PageSize: 10,
      totalCount: 0,
      keyword: "",
    });
    const recordData = ref();
    //#region 通用对话框的相关代码
    //窗体额外的参数
    const extraRef = ref<object>();
    //对话框可见性
    const modalVisibleRef = ref(false);
    //对话框内容
    const modalContentRef = shallowRef();
    function doLoadModal(actionMethod: string, rowData?: Object) {
      let modalID: string = '';
      extraRef.value = undefined;
      //必须有的
      modalVisibleRef.value = false;
      switch (actionMethod) {
        case 'creatNew': //新建
          modalID = 'userInfo';
          //额外的参数
          extraRef.value = {
            title: '新建用户',
            isNew: true
          };
          break;
        case 'edit': //编辑用户
          modalID = 'userInfo';
          //额外的参数
          extraRef.value = {
            title: '编辑用户',
            isEdit: true,
          };
          break;
        case 'roleEdit': //编辑角色
          modalID = 'roleEdit';
          extraRef.value = {
            title: '编辑角色'
          };
          break;
        case 'roleInfo': //查看角色
          modalID = 'roleInfo';
          extraRef.value = {
            title: '查看角色'
          };
          break;
      }
      if (modalID) {
        recordData.value = rowData; //赋值数据
        loadModal(modalID).then(item => {
          //Global.Logger().debug(modalID, item, "加载modal");
          modalVisibleRef.value = true;
          modalContentRef.value = item;
        });
      }
    }
    //#endregion


    // 顶部功能
    const topBarClick = (val: string, searchValue: string) => {
      //Global.Logger().debug(val, "val");
      switch (val) {
        case "searchWord":
          searchWord(searchValue);
          break;
        case "refresh":
          initTable();
          Global.Message?.msg("刷新成功");
          break;
        case "creatNew":
          doLoadModal(val);
          break;
        // case "searchUser":
        //   searchUser();
        //   break;
        case "RoleFilltr":
          RoleFilltr(searchValue);
          break;
        case "SysFilltr":
          SysFilltr(searchValue);
          break;
      }
    };
    const doActionClick = (val, row) => {
      switch (val) {
        case "edit":
        case "roleEdit":
          doLoadModal(val, row);
          break;
        case "userinfo":
        case 'roleInfo':
          doLoadModal('roleInfo', row);
          break;
        case "RoleInfo":
          const roleArr: any[] = []
          for (let i = 0; i < row.UserRoles.length; i++) {
            roleArr.push(row.UserRoles[i].Role);
          }
          doLoadModal('roleInfo', roleArr);
          break;
        case "delete":
          // Delete(row.Id);
          break;
        // case "userinfo":
        //   ViewRoleInfo(row);
        //   break;
      }
    };
    //表格点击-查看角色
    const ViewRole = (row) => {
      doActionClick('roleInfo', [row.Role]);
    };

    //生成表格
    const initTable = async () => {
      const result: any = await GetUsersList(
        tableState.keyword,
        tableState.PageIndex,
        tableState.PageSize
      );
      Global.Logger().debug(result, "用户列表--");
      if (result != undefined) {
        tableState.tableData = result.arrayList;
        tableState.totalCount = result.TotalCount;
        for (let i = 0; i < tableState.tableData.length; i++) {
          tableState.tableData[i].isShow = false;
          let user = userState.name;
          if (user == tableState.tableData[i].CreateName) {
            tableState.tableData[i].isShow = true;
          }
        }
        //Global.Logger().debug(tableState.tableData, "tableState.tableData--");
      } else {
        tableState.tableData = [];
        tableState.totalCount = 0;
      }
    };
    //筛选角色
    const RoleFilltr = async (val) => {
      //Global.Logger().debug(val, "角色id--");
      if (val) {
        let res: any = await GetUsersListByRoleOrSystem(
          val,
          "",
          tableState.PageIndex,
          tableState.PageSize
        );
        //Global.Logger().debug(res, "角色筛选");
        if (res != undefined) {
          tableState.tableData = res.arrayList;
          tableState.totalCount = res.TotalCount;
          for (let i = 0; i < tableState.tableData.length; i++) {
            tableState.tableData[i].isShow = false;
            let user = userState.name;
            if (user == tableState.tableData[i].CreateName) {
              tableState.tableData[i].isShow = true;
            }
          }
          //Global.Logger().debug(tableState.tableData, "tableState.tableData--");
        } else {
          tableState.tableData = [];
          tableState.totalCount = 0;
        }
      } else {
        initTable();
      }
    };
    //筛选系统
    const SysFilltr = async (val) => {
      //Global.Logger().debug(val, "系统id--");
      if (val) {
        let res: any = await GetUsersListByRoleOrSystem(
          "",
          val,
          tableState.PageIndex,
          tableState.PageSize
        );
        //Global.Logger().debug(res, "系统筛选");
        if (res != undefined) {
          tableState.tableData = res.arrayList;
          tableState.totalCount = res.TotalCount;
          for (let i = 0; i < tableState.tableData.length; i++) {
            tableState.tableData[i].isShow = false;
            let user = userState.name;
            if (user == tableState.tableData[i].CreateName) {
              tableState.tableData[i].isShow = true;
            }
          }
          //Global.Logger().debug(tableState.tableData, "tableState.tableData--");
        } else {
          tableState.tableData = [];
          tableState.totalCount = 0;
        }
      } else {
        initTable();
      }
    };
    //锁定用户
    const changeLock = async (row) => {
      // LockedUserList(row.Id, row.Islocked);
    };

    //监听当前页面条数
    const sizeChange = (value) => {
      tableState.PageSize = value;
      initTable();
    };
    //监听当前页数
    const pageChange = (value) => {
      tableState.PageIndex = value;
      initTable();
    };

    // 搜索
    const searchWord = (val) => {
      tableState.PageIndex = 1;
      tableState.keyword = val;
      initTable();
    };

    //删除
    const Delete = async (id) => {
      const result = true;
      if (result) {
        Global.Message?.msg("删除成功");
        initTable();
      } else {
        Global.Message?.err("删除用户失败");
      }
    };

    const contentStyle = computed(() => {
      return `height:${layoutContentHeight.value}px;width:${layoutContentWidth.value}px`;
    });

    const clientHeight=computed(() =>layoutContentHeight.value);
    onMounted(() => {
      OnEventHandler(TableEvent.RefeshTable, initTable);

      initTable();
    });
    function getRightDefaultMenus(rowItem) {
      //TODO:根据传入Row进行过滤
      const menusArray = [...getDefaultMenus()];
      if (!rowItem.isShow)
        menusArray.shift();
      return menusArray;
    }
    function getRightMoreMenus(rowItem) {
      //TODO:根据传入Row进行过滤
      return getMoreMenus();
    }

    onUnmounted(() => {
      OffEventHandler(TableEvent.RefeshTable, initTable);
    });

    return {
      topBarClick,
      ...toRefs(tableState),
      recordData,
      sizeChange,
      pageChange,
      columns,
      getRightDefaultMenus,
      getRightMoreMenus,
      doActionClick,
      Delete,
      initTable,
      changeLock,
      contentStyle,
      ViewRole,
      doLoadModal,
      modalContentRef,
      modalVisibleRef,
      extraRef,
      clientHeight
    };
  },
});
</script>
<style scoped lang="scss">
.tableContent {
  padding: 0 2px;
  overflow: auto;
}
</style>
