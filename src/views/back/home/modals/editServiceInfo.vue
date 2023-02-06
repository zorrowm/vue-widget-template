<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="服务名称" name="service">
          <a-input v-model:value="formState.service" :disabled="true" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="服务类型" name="serviceType">
          <a-select
            v-model:value="formState.serviceType"
            placeholder="请选择服务类型"
            :allowClear="true"
            :disabled="true"
          >
            <a-select-option value="0">普通服务</a-select-option>
            <a-select-option value="1" v-if="formState.serviceType === '1'">
              动态多时相
            </a-select-option>
            <a-select-option value="2" v-if="formState.serviceType === '2'">
              地形数据集
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="服务版本" name="serviceTypeVersion">
          <a-input v-model:value="formState.serviceTypeVersion" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="标题" name="title">
          <a-input v-model:value="formState.title" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="联系地址" name="contactAddressDeliveryPoint">
          <a-input v-model:value="formState.contactAddressDeliveryPoint" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="联系传真" name="contactPhoneFacsimile">
          <a-input v-model:value="formState.contactPhoneFacsimile" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="联系电话" name="contactPhoneVoice">
          <a-input v-model:value="formState.contactPhoneVoice" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="供应商名称" name="providerName">
          <a-input v-model:value="formState.providerName" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="供应商网址" name="providerSite">
          <a-input v-model:value="formState.providerSite" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="摘要" name="abstract">
          <a-input v-model:value="formState.abstract" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="访问条件" name="accessConstraints">
          <a-input v-model:value="formState.accessConstraints" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="费用" name="fees">
          <a-input v-model:value="formState.fees" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="个人名称" name="individualName">
          <a-input v-model:value="formState.individualName" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item label="时相时间" name="multiDate">
          <a-date-picker
            v-model="formState.multiDate"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="详细地址" name="positionName">
          <a-input v-model:value="formState.positionName" />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="onCancel">取消</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    onMounted,
    watch,
    UnwrapRef,
    toRaw,
    onUnmounted
  } from 'vue';
  import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
  import { IExtraProperty } from '@/models/IModalModels';
  import { GlobalHprose, ProxyClient, Global } from 'xframelib';
  import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
  import TableEvent from '@/events/modules/TableEvent';
  import dayjs from 'dayjs';
  import {object} from 'vue-types'
  interface FormState {
    service: string;
    serviceType: any;
    serviceTypeVersion: string | undefined;
    title: string | undefined;
    contactAddressDeliveryPoint: string | undefined;
    contactPhoneFacsimile: string | undefined;
    contactPhoneVoice: any;
    providerName: string | undefined;
    providerSite: string | undefined;
    abstract: string | undefined;
    accessConstraints: string | undefined;
    fees: string | undefined;
    individualName: string | undefined;
    multiDate: any;
    positionName: string | undefined;
    id: string;
  }
  const name = 'editServiceInfo';
  export default defineComponent({
    name,
    components: {},
    props: {
      data: {
        type: Object,
        default: {}
      },
      extra:object<IExtraProperty>()
    },
    setup(props, { emit }) {
      //#region 对话框模板相关
      //确定或取消的处理方法
      function OkCancelHandler(isOk: boolean) {
        //Global.Logger().info("我是OkCancelHandler");
        if (isOk) {
          onSubmit();
          EmitMsg(TableEvent.RefeshTable, undefined);
        } else {
          formRef.value.resetFields();
        }
      }
      onMounted(() => {
        //Global.Logger().info("我是onMounted");
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
          initData();
        },
        {
          deep: true
        }
      );
      // const dateFormat = "YYYY/MM/DD";
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({
        service: '',
        serviceType: 0,
        serviceTypeVersion: '',
        title: '',
        contactAddressDeliveryPoint: '',
        contactPhoneFacsimile: '',
        contactPhoneVoice: '',
        providerName: '',
        providerSite: '',
        abstract: '',
        accessConstraints: '',
        fees: '',
        individualName: '',
        multiDate: null,
        positionName: '',
        id: ''
      });
      const state = reactive({
        serviceURL: Global.Config.ServiceURL.DefaultHproseAPI
        // serviceType: 0,
      });

      //获取服务信息
      const getServiceInfo = () => {
        let url = state.serviceURL.split('').reverse().join('');
        url.slice(11);
        let url2 = url.split('').reverse().join('');
        //Global.Logger().info(url2, '11111');
        ServiceInfoService.GetServicemetadataAsync(url2, props.data.name).then(res => {
          //Global.Logger().info(res, 'res获取元数据');
          res.info.multiDate = dayjs(res.info.multiDate).format('YYYY-MM-DD');
          formState.multiDate = res.info.multiDate;
          // formState.multiDate = "2021-08-04";
          // formState.multiDate = dayjs(formState.multiDate, "YYYY-MM-DD");
          // (formState.multiDate = dayjs("2015/01/01", dateFormat)),
          //Global.Logger().info('hello', formState.multiDate);
          // //Global.Logger().info("hello", res.info.multiDate);
          for (let i in formState) {
            if (res.info[i]) {
              formState[i] = res.info[i];
            }
          }
        });
        //Global.Logger().info(props.data, 'rowdata', formState, 'formstate');
      };
      //编辑服务元数据
      const editServiceInfo = () => {
        ServiceInfoService.UpdateServicemetadataAsync(formState).then(res => {
          //Global.Logger().info(res, 'res编辑服务元数据');
          if (res === true) {
            Global.Message?.msg('编辑服务信息成功!');
            emit('editServiceInfoSubmit', true);
          } else {
            Global.Message?.err('编辑服务信息失败!');
          }
        });
      };

      //发布服务确定
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            //Global.Logger().info('values', formState, toRaw(formState));
            editServiceInfo();
          })
          .catch((error: ValidateErrorEntity<FormState>) => {
            //Global.Logger().info('error', error);
          });
      };
      //发布服务取消
      // const onCancel = () => {
      //   formRef.value.resetFields();
      //   // emit('editServiceInfoSubmit', true);
      // };

      //初始化数据
      const initData = () => {
        getServiceInfo();
      };

      onMounted(() => {
        //Global.Logger().info(props.data,'editserviceinfo页rowdata');
        initData();
      });

      return {
        formState,
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        formRef,
        onSubmit,
        // onCancel,
        ...toRefs(state)
        // dateFormat,
      };
    }
  });
</script>
