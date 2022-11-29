<template>
  <a-modal
    :width="width"
    :visible="visibleRef"
    :title="titleRef"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <component v-bind:is="content" :extra="extra" :data="dataRef"></component>
  </a-modal>
</template>
<script lang="ts">
  import { EmitMsg } from '@/events';
  import { IExtraProperty } from '@/models/IModalModels';
  import { object,number,bool,oneOfType } from "vue-types";
  import {defineComponent,ref,watch,computed } from 'vue'
  import { Global } from 'xframelib';
  
  export default defineComponent({
    name: 'ModalContainer',
    props: {
      width:number().def(400),
      visible:bool().def(false),
      content: object<any>(),
      //支持数据为多类型
      data:oneOfType([String,Number,Boolean,Array,Object]),
      extra: object<IExtraProperty>(),
    },
    setup(props) {
      //const widthRef = computed(() => props.width);
      const visibleRef = ref<boolean>(props.visible);
      const dataRef=ref(props.data);

      watch(
        () => props.visible,
        (newVal, oldVal) => {
           visibleRef.value = newVal;
        }
      );
      //解决：不可见时仍旧传值
      watch(()=>props.data,()=>{
        if(visibleRef.value)
        {
          dataRef.value=props.data;
        }
      })
      //标题
      const titleRef = computed(() => {
        if (props.extra?.title) return props.extra?.title;
        else if (props.content) return props.content.title;
        else return '对话框';
      });

      //确定
      const handleOk = (e: MouseEvent) => {
        const formChild=props.content;
        if(formChild)
        {
          if(formChild.validateForm)
          {
            formChild.validateForm().then(res=>{
              //校验成功
              visibleRef.value = false;
              EmitMsg(formChild.name, true);
              }).catch(ex=>{
                Global.Message?.err('表单校验失败！')              
              })
          }
          else
          {
             visibleRef.value = false;
             EmitMsg(formChild.name, true);
          }
        }
      };
      //取消
      const handleCancel = (e: MouseEvent) => {
        visibleRef.value = false;
        if (props.content) EmitMsg(props.content.name, false);
      };

      return {
        dataRef,
        visibleRef,
        handleOk,
        titleRef,
        handleCancel
      };
    }
  });
</script>