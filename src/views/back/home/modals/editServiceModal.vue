<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="formRef">
    <a-form-item label="服务名称" name="name">
      <a-input v-model:value="formState.name" :disabled="isEdit" />
    </a-form-item>
    <a-form-item label="服务别名" name="aliasname">
      <a-input v-model:value="formState.aliasname" />
    </a-form-item>
    <a-form-item label="归属数据集" name="dataset">
      <a-select v-model:value="formState.dataset" placeholder="请选择服务类型" :allowClear="true" :disabled="isEdit || isCopy">
        <a-select-option v-for="(item, index) in programList" :key="index" :value="item">
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="服务类型" name="type">
      <a-select v-model:value="formState.type" placeholder="请选择服务类型" :allowClear="true" :disabled="isEdit || isCopy">
        <a-select-option :value="0">普通服务</a-select-option>
        <a-select-option :value="1">动态多时相</a-select-option>
        <a-select-option :value="2">地形数据集</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="切片方案" name="rule">
      <SchemaSelectVue :is-edit-copy="isEdit || isCopy"></SchemaSelectVue>
    </a-form-item>
    <a-form-item label="渲染样式" name="style">
      <StyleSelectVue :is-edit-copy="isEdit || isCopy"></StyleSelectVue>
    </a-form-item>
    <a-form-item label="级别设置">

      <a-form-item label="最小" name="minlevel" class="scopeBox">
        <a-input-number v-model:value="formState.minlevel" :min="0" :max="22" />
      </a-form-item>
      <a-form-item label="最大" name="maxlevel" class="scopeBox">
        <a-input-number v-model:value="formState.maxlevel" :min="0" :max="22" />
      </a-form-item>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { DatasetService } from '@/service/dataSource/DatasetService';
import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
import ServiceClients from '@/service/index';
import {
  computed, defineComponent, onMounted, onUnmounted, reactive, ref, toRefs, UnwrapRef, watch
} from 'vue';
import { Global } from 'xframelib';

import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
import TableEvent from '@/events/modules/TableEvent';
import { IExtraProperty } from '@/models/IModalModels';
import ImageBatchService from '@/service/imageAdminDefault/ImageBatchService';
import { object } from 'vue-types'

interface FormState {
  name: string;
  aliasname: string;
  dataset: string;
  type: number;
  rule: string;
  style: string;
  minlevel: number;
  maxlevel: number;
}
interface IExtraNewEdit extends IExtraProperty {
  isEdit?: boolean;
  isCopy?: boolean;
}
const name = 'editServiceID';
//验证函数
let validateForm: Function | undefined;
const componentContent = {
  validateForm,
  name,
  // emits: ['addServiceSubmit'],
  props: {
    data: {
      type: Object,
      default: {}
    },
    extra: object<IExtraNewEdit>()
  },
  setup(props, { emit }) {
    //#region 对话框模板相关
    //确定或取消的处理方法
    function OkCancelHandler(isOk: boolean) {
      if (isOk) {
        onSubmit();
      } else {
        //WM:不能重置，打开窗体第二次，值消失
        // formRef.value.resetFields();
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
        initData();
      },
      {
        deep: true
      }
    );
    let service = new DatasetService(ServiceClients.DatasetClient);
    const state = reactive({
      serviceType: 0,
      programList: [] as any,
      tileRuleList: [] as any,
      styleList: [] as any
    });
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      dataset: '',
      aliasname: '',
      type: 0,
      minlevel: 1,
      maxlevel: 22,
      rule: "",
      style: "",
    });

    const isEdit = computed(() => {
      return props.extra?.isEdit;
    });
    const isCopy = computed(() => props.extra?.isCopy);
    const rules = {
      name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      rule: [{ required: true, message: '请选择切片方案', trigger: 'blur' }],
      style: [{ required: true, message: '请选择渲染样式', trigger: 'blur'  }],
      dataset: [{ required: true, message: '请选择归属项目', trigger: 'blur' }],
      minlevel: [
        {
          required: true,
          message: '不可为空',
          trigger: 'blur',
          type: 'number'
        }
      ],
      maxlevel: [
        {
          required: true,
          message: '不可为空',
          trigger: 'blur',
          type: 'number'
        }
      ]
    };
    //分页
    const Pagestate = reactive({
      totalCountRule: 0,
      pageSizeRule: 10,
      pageIndexRule: 1,
      totalCountStyle: 0,
      pageSizeStyle: 10,
      pageIndexStyle: 1
    });
    //获取全部项目名称列表
    const getProgramList = () => {
      service.GetProgramListAllAsync(state.serviceType).then(res => {
        //Global.Logger().info(res, "res获取全部项目名称列表");
        state.programList = res;
      });
    };

    /**
     * 校验表格
     */
    componentContent.validateForm = () => {
      return formRef.value.validate();
    }
    //发布服务确定
    const onSubmit = () => {
      if (isCopy.value) {
        copyService();
      } else if (isEdit.value) {
        editService();
      } else {
        addService();
      }
    };

    //新建服务
    const addService = () => {
      ServiceInfoService.AddService(formState)
        .then(res => {
          //Global.Logger().info(res, "res新建服务");
          if (res === true) {
            Global.Message?.msg('新建服务成功!');
            formRef.value.resetFields();//重置初始化
            EmitMsg(TableEvent.RefeshTable, undefined);
          } else {
            Global.Message?.err('新建服务失败!');
          }
        })
        .catch(ex => {
          Global.Message?.err('操作失败:' + ex.message);
        });
    };
    // 复制服务
    const copyService = () => {
      ImageBatchService.ServiceinfoCopyAsync(props.data.name, formState)
        .then(res => {
          if (res === true) {
            EmitMsg(TableEvent.RefeshTable, undefined);
            Global.Message?.msg('复制服务成功!');
          } else {
            Global.Message?.err('复制服务失败!');
          }
        })
        .catch(error => {
          Global.Message?.err(error + '');
        });
    };
    // 编辑服务
    const editService = () => {
      ServiceInfoService.UpdateServiceAsync(
        props.data.name,
        formState.Aliasname,
        formState.Minlevel,
        formState.Maxlevel,
        formState.style
      )
        .then(res => {
          if (res === true) {
            EmitMsg(TableEvent.RefeshTable, undefined);
            Global.Message?.msg('编辑服务成功!');
          } else {
            Global.Message?.err('编辑服务失败!');
          }
        })
        .catch(error => {
          alert(error);
        });
    };

    //初始化数据
    const initData = () => {
      if (props.extra?.isEdit || props.extra?.isCopy) {
        for (let i in formState) {
          if (props.data[i.toLowerCase()]) {
            formState[i] = props.data[i.toLowerCase()];
          }
        }
        if (props.extra?.isCopy)
          formState.name += 'Copy';
      }
      else {
        //是新
        formRef.value.resetFields();
      }
      getProgramList();
    };

    onMounted(() => {
      initData();
    });

    return {
      formState,
      ...toRefs(state),
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formRef,
      rules,
      onSubmit,
      isEdit,
      isCopy
    };
  }
}
export default defineComponent(componentContent);
</script>
