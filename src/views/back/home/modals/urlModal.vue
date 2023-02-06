<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
    <a-form-item label="IP" name="url">
      <a-input v-model:value="formState.url" :disabled="true" />
    </a-form-item>
    <a-form-item label="类型">
      <a-input v-model:value="formState.prj" :disabled="true" />
    </a-form-item>
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name" :disabled="true" />
    </a-form-item>
    <a-form-item label="级别">
      <a-input v-model:value="formState.level" />
    </a-form-item>
    <a-form-item label="X范围">
      {{ formState.xCover }}
    </a-form-item>
    <a-form-item label="Y范围">
      {{ formState.yCover }}
    </a-form-item>
    <a-form-item label="地址">
      {{ formState.url }}
    </a-form-item>
    <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">确认</a-button>
      <a-button style="margin-left: 10px" @click="onCancel">取消</a-button>
    </a-form-item> -->
  </a-form>
</template>

<script lang="ts">
  import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
import TableEvent from '@/events/modules/TableEvent';
import { IExtraProperty } from '@/models/IModalModels';
import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import {
defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, UnwrapRef, watch
} from 'vue';
import { object } from 'vue-types';
import { Global } from 'xframelib';

  interface FormState {
    ip: string;
    prj: string | undefined;
    name: string;
    imgid: string;
    level: number;
    url: string;
    xCover: string;
    yCover: string;
  }
  const name = 'urlModal';
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
        () => {
          initData();
        },
        {
          deep: true
        }
      );
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({
        ip: Global.Config.ServiceURL.DefaultHproseAPI,
        prj: 's',
        name: props.data.name,
        imgid: '',
        level: 10,
        url: '',
        xCover: '',
        yCover: ''
      });
      const state = reactive({});

      //获取url链接地址
      const getTilesUrl = () => {
        ServiceInfoService.GetTilesUrlByType(formState.ip, 's', props.data.name, '', 10).then(
          res => {
            //Global.Logger().info(res, 'res获取url链接地址');
            if (res != undefined) {
              formState.xCover = res.xminnum + '-' + res.xmaxnum;
              formState.yCover = res.yminnum + '-' + res.ymaxnum;
              for (let i in formState) {
                if (res[i]) {
                  formState[i] = res[i];
                }
              }
            }
          }
        );
      };

      //确定
      const onSubmit = () => {
        formRef.value
          .validate()
          .then(() => {
            //Global.Logger().info('values', formState, toRaw(formState));
            formRef.value.resetFields();
            // emit('urlModalSubmit', true);
          })
          .catch((error: ValidateErrorEntity<FormState>) => {
            //Global.Logger().info('error', error);
          });
      };
      //取消
      // const onCancel = () => {
      //   formRef.value.resetFields();
      //   // emit('urlModalSubmit', true);
      // };

      //初始化数据
      const initData = () => {
        formRef.value.resetFields();
        getTilesUrl();
      };

      onMounted(() => {
        initData();
      });

      return {
        formRef,
        ...toRefs(state),
        formState,
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        onSubmit
        // onCancel
      };
    }
  });
</script>
