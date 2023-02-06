<template>
    <div>
    <TopFunBar :title="'服务列表'" @topBarClick="topBarClick" />
    <a-table   size="small" :row-selection="rowSelection" :columns="columns" :data-source="tableData" :pagination="false" rowKey="name"
    :scroll="scrollRef">
      <template #bodyCell="{ text, column, record }">
        <v-switch :case="column.key" v-if="column.key">
          <template #operation>
            <ActionMenu :currentRow="record" @doActionClick="doActionClick"
              :default-menus="getRightDefaultMenus(record)" :append-menus="getRightMoreMenus(record)" />
          </template>
          <template #rule>
            <span @click="ruleClick(record)">
              <a-tag color="orange" style="cursor: pointer">
                {{ text }}
              </a-tag>
            </span>
          </template>

          <template #style>
            <span @click="styleFormclick(record)">
              <a-tag color="cyan" style="cursor: pointer">
                {{ text }}
              </a-tag>
            </span>
          </template>

          <!-- 转化 状态 -->
          <template #precachestatus>
            <span v-if="record.status != 0">正在进行</span>
            <Icon icon="ant-design:check-circle-twotone" color="#52c41a" v-else />
          </template>
        </v-switch>
      </template>
    </a-table>

    <Pagination style="text-align: right; margin-top: 5px" :totalCount="totalCount" :pagesize="PageSize"
      :pageindex="PageIndex" @pageChange="pageChange" @sizeChange="sizeChange" />
  </div>
</template>

<script lang="ts">
import ActionMenu from '@/components/Menu/ActionMenu.vue';
import Pagination from '@/components/Pagination/index.vue';
import TopFunBar from '@/components/TopFunBar/index.vue';
import VSwitch from '@/components/VSwitch.vue';
import { OffEventHandler, OnEventHandler } from '@/events';
import TableEvent from '@/events/modules/TableEvent';
import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
import { doLoadModal } from '@/utils/WidgetsTool';
import { Icon } from '@iconify/vue';
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Global } from 'xframelib';
import { getDefaultMenus, getMoreMenus } from './models/ActionMenus';
import { columns } from './models/TabColumns';
import {scrollRef} from '@/utils/scrollRef';
import {OpenServiceTileJson, OpenURL} from '@/utils/urlUtils'
export default defineComponent({
  name: 'serviceList',
  components: {
    TopFunBar,
    Pagination,
    ActionMenu,
    Icon, 
    VSwitch
  },
  props: {},
  setup() {
    const tableState = reactive({
      tableData: [] as any,
      PageIndex: 1,
      PageSize: 10,
      totalCount: 0,
      keyword: '',
      sortname: '',
      sortway: 0
    });
    const state = reactive({
      rowData: {} as any,
      deleteArr: [] as any,
      recordData: {} as any
    });

    const topBarClick = (val: string, searchValue: string) => {
      switch (val) {
        case 'searchWord':
          searchWord(searchValue);
          break;
        case 'creatNew':
          showModal('creatNew');
          break;
        case 'batchDelete':
          batchDelete();
          break;
        case 'refresh':
          initTable();
          break;
      }
    };
    //#region 通用对话框的相关代码
    function showModal(actionMethod: string, rowData?: any) {
      //Global.Logger().info(actionMethod, '---actionMethod---');
      let modalID: string = '';
      let extraData:any;
      switch (actionMethod) {
        case 'copySrvice': //复制服务
          modalID = 'editServiceID';
          extraData = {
            title: '复制服务',
            isEdit: false,
            isCopy: true
          };
          break;
        case 'editSrvice': //编辑服务
          modalID = 'editServiceID';
          extraData = {
            title: '编辑服务',
            isEdit: true,
            isCopy: false
          };
          break;
        case 'creatNew': //新建服务
          //Global.Logger().info('我是新建！');
          modalID = 'editServiceID';
          extraData = {
            title: '新建服务',
            isEdit: false,
            isCopy: false
          };
          break;
        case 'add':
          modalID = 'addServiceData';
          extraData = {
            title: `向${rowData?.name}添加数据`
          };
          break;
        case 'smallPreCache':
          modalID = 'rebuildThumbnailID';
          extraData = {
            title: '小级别预缓存',
            isSmallPreCache: true,
            isRebuildThumbnail: false
          };
          break;
        case 'viewMetaData': //查看元数据
          modalID = 'viewMetaDataID';
          extraData = {
            title: `服务${rowData?.name}元数据信息`
          };
          break;
        case 'viewServiceInfo': //查看服务信息
          //Global.Logger().info('选中了查看服务信息');
          modalID = 'viewServiceMessageID';
          extraData = {
            title: '查看服务信息'
          };
          break;
        case 'editServiceInfo': //编辑服务信息
          modalID = 'editServiceMessageID';
          extraData = {
            title: '编辑服务信息'
          };
          break;
        case 'rebuildThumbnail': //重建缩略图
          modalID = 'rebuildThumbnailID';
          extraData = {
            title: '重建缩略图',
            isSmallPreCache: false,
            isRebuildThumbnail: true
          };
          break;
        case 'getImageURL': //获取影像链接
          modalID = 'getImageURLID';
          extraData = {
            title: '获取影像链接'
          };
          break;
        case 'TileSchemaForm': //查看切片方案
          modalID = 'TileSchemaForm';
          extraData = {
            title: '切片方案：' + rowData
          };
          break;
        case 'StyleForm': //渲染样式
          modalID = 'StyleForm';
          extraData = {
            title: '渲染样式：' + rowData
          };
          break;
      }
      if (modalID) {
          const modalData={
                modalID,
                extraData,
                rowData,
                width:700
            };
          doLoadModal(modalData);
      }
    }
    //#endregion
    const doActionClick = (val, row) => {
      //Global.Logger().info(val, 'doActionClick');
      switch (val) {
        case 'preview':
          previewMap(row);
          break;
        case 'add':
        case 'smallPreCache':
        case 'preCache':
        case 'copySrvice':
        case 'editSrvice':
        case 'viewServiceInfo':
        case 'editServiceInfo':
        case 'rebuildThumbnail':
        case 'getImageURL':
        case 'viewMetaData':
          showModal(val, row);
          break;
        case 'seriviceTileJson':
        OpenServiceTileJson('s:'+row.name);
          break;
        case 'delete':
          state.deleteArr.push(row.name);
          batchDelete();
          break;
        case 'toolIndex':
          fixIndex(row);
          break;
        case 'cleanNowCache':
          cleanCache(row);
          break;
        // 清空即时缓存
      }
      state.rowData = row;
    };
    //浏览地图
    const router = useRouter();
    const previewMap = row => {
      OpenURL(router,'/mappreview',{ id: row.name, type: 's' })
    };
    //生成表格
    const initTable = () => {
      //Global.Logger().info('我是inittable我执行了------------------');
      ServiceInfoService.GetAllServices(
        tableState.keyword,
        tableState.PageIndex,
        tableState.PageSize,
        tableState.sortname,
        tableState.sortway
      ).then(res => {
        if (res != undefined) {
          tableState.tableData = res.arrayList;
          tableState.totalCount = res.totalCount;
          for (let i = 0; i < tableState.tableData.length; i++) {
            tableState.tableData[i].level =
              tableState.tableData[i].minlevel + '~' + tableState.tableData[i].maxlevel;
            if (tableState.tableData[i].precache === 0) {
              tableState.tableData[i].cachestatus = '无';
            } else {
              tableState.tableData[i].cachestatus =
                '缓存级别:' + tableState.tableData[i].precachelevel;
            }
          }
        } else {
          tableState.tableData = [];
          tableState.totalCount = 0;
        }
      });
    };
    //复选框回调
    const rowSelection = {
      onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
        //Global.Logger().info(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        state.deleteArr = [];
        for (let i = 0; i < selectedRows.length; i++) {
          state.deleteArr.push(selectedRows[i].name);
        }
      },
      // getCheckboxProps: (record: any) => ({
      //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
      //   name: record.name
      // })
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
    //搜索
    const searchWord = val => {
      tableState.keyword = val;
      tableState.PageIndex = 1;
      initTable();
    };
    //批量删除
    const batchDelete = () => {
      if (state.deleteArr.length > 0) {
        ServiceInfoService.DeleteServiceAsync(state.deleteArr).then(res => {
          // //Global.Logger().info(res, "res批量删除");
          if (res === true) {
            Global.Message?.msg('删除服务成功!');
            initTable();
          } else {
            Global.Message?.err('删除服务失败!');
          }
        });
      } else {
        Global.Message?.err('请选择数据!');
      }
    };

    //修复索引
    const fixIndex = row => {
      ServiceInfoService.ReconstructionServiceIndexAsync(row.name, '').then(res => {
        //Global.Logger().info(res, 'res修复索引');
        if (res === true) {
          Global.Message?.msg('修复索引成功!');
          initTable();
        } else {
          Global.Message?.err('修复索引失败!');
        }
      });
    };
    //清空即时缓存
    const cleanCache = row => {
      ServiceInfoService.DeletServiceRedisCacheAsync(row.name).then(res => {
        //Global.Logger().info(res, 'res清空即时缓存');
        if (res === true) {
          Global.Message?.msg('清空即时缓存成功!');
          initTable();
        } else {
          Global.Message?.err('清空即时缓存失败!');
        }
      });
    };
    const ruleClick = row => {
      showModal('TileSchemaForm', row.rule);
    };
    // //点击渲染样式
    const styleFormclick = row => {
      showModal('StyleForm', row.style);
    };

    const route = useRoute();
    onMounted(() => {
      OnEventHandler(TableEvent.RefeshTable, initTable);
      //Global.Logger().info(route.query.name, '我是参数');
      if (route.query.name != '') {
        searchWord(route.query.name);
      }
      //Global.Logger().info(route.query.name, '列表页路由跳转得到的参数');
    });
    onUnmounted(() => {
      OffEventHandler(TableEvent.RefeshTable, initTable);
    });
    //获取表格的菜单栏
    function getRightDefaultMenus(rowItem) {
      //TODO:根据传入Row进行过滤
      const hasData = rowItem.countdata === 0;
      const menusArray = [...getDefaultMenus()];
      if (hasData)
        menusArray.shift();
      return menusArray;
    }
    function getRightMoreMenus(rowItem) {
      //TODO:根据传入Row进行过滤
      const hasData = rowItem.countdata != 0;
      return getMoreMenus(hasData);
    }
    return {
      topBarClick,
      rowSelection,
      columns,
      ...toRefs(tableState),
      initTable,
      sizeChange,
      pageChange,
      doActionClick,
      ...toRefs(state),
      getRightDefaultMenus,
      getRightMoreMenus,
      styleFormclick,
      ruleClick,
      scrollRef
    };
  }
});
</script>