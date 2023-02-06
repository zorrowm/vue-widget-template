<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
    <a-form-item label="服务URL" name="serivceUrl">{{ formState.serivceUrl }}</a-form-item>
    <a-divider orientation="left">基本信息</a-divider>
    <a-form-item label="数据大小" name="fileSize">{{ formState.fileSize }}MB</a-form-item>
    <!-- <a-form-item label="服务数量" name="serviceCount">{{formState.serviceCount}}</a-form-item> -->
    <a-divider orientation="left">范围信息</a-divider>
    <a-form-item label="上" class="scopeBox" name="xMax">{{ formState.xMax }}</a-form-item>
    <a-form-item label="下" class="scopeBox" name="xMin">{{ formState.xMin }}</a-form-item>
    <a-form-item label="左" class="scopeBox" name="yMin">{{ formState.yMin }}</a-form-item>
    <a-form-item label="右" class="scopeBox" name="yMax">{{ formState.yMax }}</a-form-item>
    <a-divider orientation="left">波段信息</a-divider>
    <div style="height: 300px; overflow: auto">
      <div v-for="(item, index) in bandsList" :key="index">
        <a-divider orientation="left">波段{{ index + 1 }}</a-divider>
        <a-form-item label="最小值">{{ item.minvalue }}</a-form-item>
        <a-form-item label="最大值">{{ item.maxvalue }}</a-form-item>
        <a-form-item label="平均值">{{ item.averagevalue }}</a-form-item>
        <a-form-item label="标准偏差">{{ item.standarddeviation }}</a-form-item>
      </div>
    </div>

    <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">确定</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted, watch, UnwrapRef } from 'vue';
  import { GlobalHprose, ProxyClient, Global } from 'xframelib';
  import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
  import { IExtraProperty } from '@/models/IModalModels';
import {object} from 'vue-types'
  interface FormState {
    serivceUrl: string;
    xMin: any;
    yMin: any;
    xMax: any;
    yMax: any;
    fileSize: string;
    serviceCount: string;
  }

  interface IExtraMetaData extends IExtraProperty {
    // isEdit?: boolean;
    // isCopy?: boolean;
  }
  export default defineComponent({
    name: 'metaModal',
    components: {},
    props: {
      data: {
        type: Object,
        default: {}
      },
      extra: object<IExtraMetaData>()
    },
    setup(props, { emit }) {
      watch(
        () => props.data,
        val => {
          formRef.value.resetFields();
          state.bandsList = [];
          initData();
        },
        {
          deep: true
        }
      );
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({
        serivceUrl: '',
        xMin: null,
        yMin: null,
        xMax: null,
        yMax: null,
        fileSize: '',
        serviceCount: ''
      });
      const state = reactive({
        serivceUrl: Global.Config.ServiceURL.WMTSService,
        bandsList: [] as any
      });
      //获取元数据
      const getScope = () => {
        ServiceInfoService.GetServicemetadataAsync1(props.data.name).then(res => {
          //Global.Logger().info(res, 'res获取元数据');
          formState.xMin = res.down;
          formState.yMin = res.left;
          formState.xMax = res.right;
          formState.yMax = res.upper;
          state.bandsList = res.bands;
          formState.fileSize = res.fileSize;
          // formState.serviceCount = res.serviceCount;
        });
      };

      const onSubmit = () => {
        formRef.value.resetFields();
        state.bandsList = [];
        emit('metaSubmit', true);
      };
      //初始化数据
      const initData = () => {
        getScope();
        formState.serivceUrl = state.serivceUrl + '/s:' + props.data.name + '/Capabilities';
      };

      onMounted(() => {
        initData();
      });

      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        formState,
        ...toRefs(state),
        onSubmit,
        formRef
      };
    }
  });
</script>
