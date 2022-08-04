<template>
  <div>
    <a-form
      validation
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      ref="formRef"
    >
      <a-form-item label="旧密码" name="oldPassword"
        :rules="[{ required: true, message: '输入旧密码!' }]"
      >
        <a-input-password
          type="password"
          autocomplete="off"
          v-model:value="formState.oldPassword"
        />
      </a-form-item>

      <a-form-item label="新密码" name="newPassword" has-feedback>
        <a-input-password
          v-model:value="formState.newPassword"
          type="password"
          autocomplete="off"
          placeholder="请输入新密码"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="newPassword2"
        has-feedback
      >
        <a-input-password
          v-model:value="formState.newPassword2"
          autocomplete="off"
          placeholder="再次输入新密码"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { OffEventHandler, OnEventHandler } from '@/events';
import { IExtraProperty } from '@/models/IModalModels';
import type { Rule } from 'ant-design-vue/es/form';
import {
defineComponent, onMounted, onUnmounted, reactive, ref
} from "vue";
import { object,oneOfType} from "vue-types";
import { changeMyPWD, Global } from "xframelib";

interface FormState {
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  showLevel:boolean;
}
const name="changeMyPWD";
//验证函数
let validateForm:Function|undefined;

const componentContent={
  validateForm,
  name,
    props: {
     data:oneOfType([Boolean,Object]).def(false),
     extra: object<IExtraProperty>().isRequired,
  },

  setup(props, { emit }) {

 //#region 对话框模板相关
    //确定或取消的处理方法
    function OkCancelHandler(isOk: boolean) {
      if (isOk) {
        onSubmit();
      } else {
        formRef.value.resetFields();
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

    const formRef=ref();
    const formState: FormState =  reactive<FormState>({
      oldPassword: '',
      newPassword: '',
      newPassword2:'',
      showLevel:false
    });

    let validateOldPass = async (rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("输入新密码");
      } else if (value=== formState.oldPassword) {
        return Promise.reject("新旧密码不能一样!");
      } else {
        return Promise.resolve();
      }
    };
    let validatePass2 = async (rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("请再次输入密码");
      } else if (value !== formState.newPassword) {
        return Promise.reject("两次输入的不一致!");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
     newPassword: [
        { required: true, validator: validateOldPass, trigger: "change" },
      ],
      newPassword2: [
        { required: true, validator: validatePass2, trigger: "change" },
      ],
    };
    /**
     * 校验表格
     */
    componentContent.validateForm=()=>
    {
      return formRef.value.validate();
    }
    function onSubmit()
    {
        if(formState.newPassword!=formState.newPassword2)
        {
            Global.Message?.warn("两次新密码不一致");
            return;
        }
        const oldpwd= formState.oldPassword;
        const newpwd=formState.newPassword;
        changeMyPWD({
          oldpwd,
          newpwd
        }).then(res=>{
          if(res?.data)
          {
            Global.Message?.info('修改密码成功！');
          }
          else
          {
               Global.Message?.warn('修改密码失败！');
          }
        }).catch(ex=>{
          Global.Message?.warn('修改密码失败:'+ex.message);
        });
    }
    return {
      rules,
      formState,
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      onSubmit
    };
  },
}
export default defineComponent(componentContent);
</script>