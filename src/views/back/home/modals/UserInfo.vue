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
      <a-form-item label="姓名" name="Realname">
        <a-input v-model:value="formState.Realname" placeholder="请输入姓名" />
      </a-form-item>

      <a-form-item label="用户名" name="Name">
        <a-input
          v-model:value="formState.Name"
          :disabled="disabled"
          placeholder="请输入用户名"
        />
      </a-form-item>

      <a-form-item label="密码" name="Password" visibilityToggle="false" has-feedback>
        <a-input-password
          v-model:value="formState.Password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item label="密码强度" v-if="showLevel">
        <span class="line" :class="[level.includes('low') ? 'low' : '']"></span>
        <span
          class="line"
          :class="[level.includes('middle') ? 'middle' : '']"
        ></span>
        <span
          class="line"
          :class="[level.includes('high') ? 'high' : '']"
        ></span>
        <div style="font-size: 12px">
          {{ levelText }}
        </div>
        <span class="tootip">密码不能少于8位</span>
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="CheckPass"
        has-feedback
        v-if="showPassCheck"
      >
        <a-input-password
          v-model:value="formState.CheckPass"
          autocomplete="off"
          placeholder="请输入确认密码"
        />
      </a-form-item>
      <a-form-item label="授权key" name="AppKey">
        <a-input v-model:value="formState.Appkey" placeholder="请输入授权key" />
      </a-form-item>
      <a-row :gutter="[16, 16]">
         <a-col :span="24">
          <a-form-item
            label="角色"
            name="Roleid"
            :wrapper-col="{ span: 8 }"
            v-if="isNew"
          >
            <a-select
              mode="multiple"
              v-model:value="formState.Roleid"
              placeholder="请选择你的角色"
              :getPopupContainer="
                (triggerNode) => {
                  return triggerNode.parentNode;
                }
              "
            >
              <a-select-option
                v-for="(item, index) in roleList"
                :key="index"
                :value="item.Id"
              >
                {{ item.Name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="24">
          <a-form-item label="锁定" name="Islocked">
            <a-radio-group v-model:value="formState.Islocked">
              <a-radio :value="false">否</a-radio>
              <a-radio :value="true">是</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="备注">
        <a-textarea
          v-model:value="formState.Remark"
          placeholder="请输入备注"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
  watch,onUnmounted
} from "vue";
import type { Rule } from 'ant-design-vue/es/form';
import { Global, H5Tool, uuid } from "xframelib";
import { GetDepartmentList } from "@/api/AuthService";
import {
  getRoleList,
  SaveUser,
  UpdateUser,
  GetUserInfoByName,
} from "@/api/AuthService";
  import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
  import { IExtraProperty } from '@/models/IModalModels';
  import TableEvent from '@/events/modules/TableEvent';
  import { object,string } from "vue-types";

  interface IExtraAddData extends IExtraProperty {
   isEdit?: boolean;
   isNew?:boolean;
   isSee?:boolean;//浏览
    // isCopy?: boolean;
  }
const name = 'userInfo';
export default defineComponent({
  name,
  components: {
    VNodes: (_, { attrs }) => {
      return attrs.vnodes;
    },
  },
  props: {
     data:object(),
    drawerTiTle:string().def(''),
     extra: object<IExtraAddData>().isRequired,
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
         initData();
      });
      onUnmounted(() => {
        OffEventHandler(name, OkCancelHandler);
      });
//#endregion
      watch(
        () => props.data,
        val => {
          if(val)
            editInit();
        },
        {
          deep:true
        }
      );
    const state = reactive({
      conformPasswd: "",
      treeData: [] as any,
      replaceFields: {
        children: "Children",
        title: "Name",
      },
      groupSeleceted: {} as any,
      roleList: [] as any,
      disabled: false,
      level: [] as any,
      levelText: "",
      showLevel: false,
      showPassCheck: true,
      roleCreate: [] as any,
    });
    const formState: any = reactive({
      Realname: "",
      Name: "",
      Password: "",
      Departmentid: "",
      Department: {
        Name: "",
      },
      Roleid: [] as any,
      Islocked: false,
      Remark: "",
      CheckPass: "",
      Id: "",
      Appkey: uuid(),
      UserRoles: [] as any,
      Cjsj: "",
    });
    const formRef = ref();
    watch(
      () => formState.Password,
      (n, o) => {
        if (o != "") {
          if (n != o) {
            formState.CheckPass = "";
          }
        }
      }
    );
    let validatePass = async (rule: Rule, value: string) => {
      state.level = [];
      if (value === "") {
        state.showLevel = false;
        return Promise.reject("请输入密码");
      } else {
        if (value.length < 6) {
          state.showLevel = false;
          return Promise.reject("密码不能少于6位");
        }
        state.showLevel = true;
        const regex1 = /^\d+$/; // 效验是否位纯数字
        const regex2 = /^[a-z]+$/; // 效验纯小写字母
        const regex3 = /^[A-Z]+$/; // 效验纯大写字母
        if (regex1.test(value)) {
          state.level.push("low");
          state.levelText = "强度低,建议包含大小写字母";
        } else if (regex2.test(value)) {
          state.level.push("low");
          state.levelText = "强度低,建议包含大写字母和数字";
        } else if (regex3.test(value)) {
          state.level.push("low");
          state.levelText = "强度低,建议包含数字和小写字母";
        } else if (/^[a-z\d]+$/.test(value)) {
          state.level.push("low");
          state.level.push("middle");
          state.levelText = "中等,建议包含大写字母";
        } else if (/^[A-Z\d]+$/.test(value)) {
          state.level.push("low");
          state.level.push("middle");
          state.levelText = "中等,建议包含小写字母";
        } else if (/^[A-z]+$/.test(value)) {
          state.level.push("low");
          state.level.push("middle");
          state.levelText = "中等,建议包含数字";
        } else if (/^[A-z\d]+$/.test(value)) {
          state.level.push("low");
          state.level.push("middle");
          state.level.push("high");
          state.levelText = "强度高";
        }

        if (formState.CheckPass !== "") {
          formRef.value.validateFields("CheckPass");
        }
        return Promise.resolve();
      }
    };
    let validatePass2 = async (rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("请再次输入密码");
      } else if (value !== formState.Password) {
        return Promise.reject("两次输入的不一致!");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      Realname: [
        { required: true, message: "请输入真实姓名", trigger: "blur" },
      ],
      userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      Name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      Sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
      Password: [
        { required: true, validator: validatePass, trigger: "change" },
      ],
      CheckPass: [{ validator: validatePass2, trigger: "change" }],
      Mobile: [{ required: true, message: "请填写联系电话", trigger: "blur" }],
      Departmentid: [{ required: true, message: "请选择组", trigger: "blur" }],
      Qq: [{ required: true, message: "请填写qq", trigger: "blur" }],
      Islocked: [
        {
          required: true,
          message: "请选择是否锁定",
          trigger: "blur",
          type: "boolean",
        },
      ],
    };
      const isNew = computed(() => {
        return props.extra?.isNew;
      });
      const isEdit = computed(() => {
        return props.extra?.isEdit;
      });
      // const isCopy = computed(() => props.extra?.isCopy);
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          //console.log("values", formState, toRaw(formState));
          saveUserInfo();
        })
        .catch((error) => {
          //console.log("error", error);
        });
    };

    //树控件回调
    const treeSelected = (val) => {
      //console.log(val, "树控件回调");
      state.groupSeleceted = val;
    };
    //保存用户信息
    const saveUserInfo = async () => {
      state.roleCreate = [];
      for (let i = 0; i < formState.Roleid.length; i++) {
        state.roleCreate.push({
          roleid: formState.Roleid[i],
        });
      }
      if (props.extra.isEdit) {//修改
        const result = await UpdateUser({
          name: formState.Name,
          realname: formState.Realname,
          password: '',
          islocked: formState.Islocked,
          remark: formState.Remark,
          cjsj: formState.Cjsj,
          id: formState.Id,
          appkey: formState.Appkey,
        });
        if (result) {
          Global.Message?.msg("编辑用户成功");
          //刷新
          EmitMsg(TableEvent.RefeshTable, undefined);
          restForm();
        } else {
          Global.Message?.err("编辑用户失败");
        }
      } else {
        const result = await SaveUser({
          name: formState.Name,
          realname: formState.Realname,
          password: H5Tool.MD5(formState.Password),
          islocked: formState.Islocked,
          remark: formState.Remark,
          appkey: formState.Appkey,
          userRoles: state.roleCreate,
        });
        //console.log(result, "res保存用户信息");
        if (result) {
          Global.Message?.msg("新建用户成功");
          // emit("userInfoSubmit", true);
                    //刷新
          EmitMsg(TableEvent.RefeshTable, undefined);
          restForm();
          state.roleCreate = [];
        } else {
          Global.Message?.err("新建用户失败");
        }
      }
    };

    //刷新重置表单
    const restForm = () => {
      formRef.value.resetFields();
    };
    //取消
    const onCancel = () => {
      restForm();
      // emit("userInfoSubmit", true);
      //刷新
      // EmitMsg(TableEvent.RefeshTable, undefined);
    };

    //获取组数据
    const getDepartmentList = async () => {
      const result: any = await GetDepartmentList("", 0, 0);
      //console.log(result, "res树数据");
      state.treeData.push({
        Name: "全部",
        Children: result.arrayList,
      });
    };
    //获取角色数据
    const getRoleListAll = async () => {
      const result: any = await getRoleList("", 0, 0);
      //console.log(result, "res获取角色数据");
      state.roleList = result.arrayList;
    };
    //初始化编辑数据
    const editInit = async () => {
      state.disabled = true;
      let res: any = await GetUserInfoByName(props.data.Id);
      for (let k in res) {
        if (res[k]) {
          formState[k] = res[k];
        }
      }
      formState.Password='xxxxxxxxx';
      formState.CheckPass = formState.Password;
      for (let i = 0; i < formState.UserRoles.length; i++) {
        formState.Roleid.push(formState.UserRoles[i].Role.Id);
      }

      console.log(formState, "formState-11111111");
    };

    //初始化数据
    const initData = () => {
      getDepartmentList();
      getRoleListAll();
      if (props.extra.isEdit) {
        editInit();
      }
    };

    return {
      ...toRefs(state),
      rules,
      formState,
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      onSubmit,
      treeSelected,
      onCancel,
      isNew,
      isEdit
    };
  },
});
</script>
<style lang="scss" scoped>
.line {
  display: inline-block;
  width: 48px;
  height: 4px;
  background: #d8d8d8;
  border-radius: 3px;
  margin-right: 8px;
  &.low {
    background: #f4664a;
  }
  &.middle {
    background: #ff8700;
  }
  &.high {
    background: #2cbb79;
  }
}
.tootip {
  // display: inline-block;
  // float: right;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
