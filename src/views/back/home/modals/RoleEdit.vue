<template>
  <div>
    <a-form validation :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
      <a-form-item label="用户名">{{formState.Name}}</a-form-item>
      <a-form-item label="角色" name="Roleid">
        <a-select style="width: 100%" mode="tags" size="small" v-model:value="formState.Roleid" placeholder="请选择角色"
          :getPopupContainer="
            (triggerNode) => {
              return triggerNode.parentNode;
            }
          ">
          <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.Id">
            {{ item.Name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
  onUnmounted,
  watch
} from "vue";
import { UpdateUserRole, getRoleList } from "@/api/AuthService";
import { Global } from "xframelib";
import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
import { IExtraProperty } from '@/models/IModalModels';
import TableEvent from '@/events/modules/TableEvent';
import { object } from "vue-types";
const name = 'roleEdit'
export default defineComponent({
  name,
  props: {
    data:object(),
    extra: object<IExtraProperty>().isRequired,
  },
  components: {},
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
      initData();
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
    const state = reactive({
      roleList: [] as any,
      roleCreate: [] as any,
    });
    const formState: any = reactive({
      Name:'',
      Roleid: [] as any,
    });
    const formRef = ref();
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          saveUserInfo();
        })
        .catch((error) => {
          console.log("error", error);
        });
    };

    const saveUserInfo = async () => {
      for (let i = 0; i < formState.Roleid.length; i++) {
        state.roleCreate.push(formState.Roleid[i]);
      }
      //TODO:需要更新对接方法，修改
      let res = await UpdateUserRole({
        userId: props.data.Id,
        licroleids: state.roleCreate,
      });
      if (res) {
        Global.Message?.msg("编辑成功");
        //刷新
        EmitMsg(TableEvent.RefeshTable, undefined);
        state.roleCreate = [];
      } else {
        Global.Message?.err("编辑失败");
      }
    };
    //TODO:获取管理员具有的角色，超级管理员是所有角色
    //获取角色数据
    const getRoleListAll = async () => {
      const result: any = await getRoleList("", 0, 0);
      //console.log(result, "res获取角色数据");
      state.roleList = result.arrayList;
    };
    const initData = () => {
      formState.Roleid.length=0;
      if(props.data?.UserRoles)
      {
        props.data?.UserRoles.forEach(item => {
          formState.Roleid.push(item.Role.Name);
        });
        
      }

      formState.Name=props.data.Name;

    };
    onMounted(async () => {
      initData();
      getRoleListAll();
    });
    return {
      formState,
      formRef,
      ...toRefs(state),
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
  },
});
</script>

<style>
</style>
