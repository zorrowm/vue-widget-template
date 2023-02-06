<template>
  <span>
    服务URL:
    <a :href="linkURL" target="_blank">{{ linkURL }}</a>
  </span>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" header="基本信息">
      <a-descriptions>
        <a-descriptions-item label="服务名称">{{ infoList.service }}</a-descriptions-item>
        <a-descriptions-item label="服务类型">{{ infoList.serviceType }}</a-descriptions-item>
        <a-descriptions-item label="标题">{{ infoList.title }}</a-descriptions-item>
        <a-descriptions-item label="服务版本">
          {{ infoList.serviceTypeVersion }}
        </a-descriptions-item>
      </a-descriptions>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="联系信息">
      <a-descriptions>
        <a-descriptions-item label="联系地址">
          {{ infoList.contactAddressDeliveryPoint }}
        </a-descriptions-item>
        <a-descriptions-item label="联系传真">
          {{ infoList.contactPhoneFacsimile }}
        </a-descriptions-item>
        <a-descriptions-item label="联系电话">{{ infoList.contactPhoneVoice }}</a-descriptions-item>
      </a-descriptions>
    </a-collapse-panel>
    <a-collapse-panel key="3" header="供应商信息">
      <a-descriptions>
        <a-descriptions-item label="供应商名称">{{ infoList.providerName }}</a-descriptions-item>
        <a-descriptions-item label="供应商网址">{{ infoList.providerSite }}</a-descriptions-item>
      </a-descriptions>
    </a-collapse-panel>
    <a-collapse-panel key="4" header="其他信息">
      <a-descriptions>
        <a-descriptions-item label="摘要">{{ infoList.abstract }}</a-descriptions-item>
        <a-descriptions-item label="访问条件">{{ infoList.accessConstraints }}</a-descriptions-item>
        <a-descriptions-item label="费用">{{ infoList.fees }}</a-descriptions-item>
        <a-descriptions-item label="个人名称">{{ infoList.individualName }}</a-descriptions-item>
        <a-descriptions-item label="时相时间">{{ infoList.multiDate }}</a-descriptions-item>
        <a-descriptions-item label="详细地址">
          {{ infoList.contactAddressDeliveryPoint }}
        </a-descriptions-item>
        <a-descriptions-item label="链接">
          <a :href="linkURL" target="_blank">{{ linkURL }}</a>
        </a-descriptions-item>
      </a-descriptions>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, toRefs, onMounted, watch, onUnmounted } from 'vue';
  import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
  import { GlobalHprose, ProxyClient, Global } from 'xframelib';
  import { IExtraProperty } from '@/models/IModalModels';
import {object} from 'vue-types'
  export default defineComponent({
    name: 'serviceInfo',
    components: {},
    props: {
      data: {
        type: Object,
        default: {}
      },
      extra:object<IExtraProperty>()
    },
    setup(props, { emit }) {
      watch(
        () => props.data,
        val => {
          initData();
        },
        {
          deep: true
        }
      );
      const activeKey = ref(['1']);
      const state = reactive({
        serviceURL: Global.Config.ServiceURL.DefaultHproseAPI,
        infoList: [] as any,
        linkURL: ''
      });

      //获取服务信息
      const getServiceInfo = () => {
        let url = state.serviceURL.split('').reverse().join('');
        url.slice(11);
        let url2 = url.split('').reverse().join('');
        //Global.Logger().info(url2, '11111');
        ServiceInfoService.GetServicemetadataAsync(url2, props.data.name).then(res => {
          //Global.Logger().info(res, 'res获取元数据');

          state.infoList = res.info;
          state.linkURL = res.link;

          // for (let i = 0; i < state.infoList.length; i++) {
          //   if (state.infoList[i].serviceType === "0") {
          //     state.infoList[i].serviceType = "普通服务";
          //   } else if (state.infoList[i].serviceType === "1") {
          //     state.infoList[i].serviceType = "动态多时相";
          //   } else if (state.infoList[i].serviceType === "2") {
          //     state.infoList[i].serviceType = "地形数据集";
          //   }
          // }
          switch (state.infoList.serviceType) {
            case '0':
              state.infoList.serviceType = '普通服务';
              break;
            case '1':
              state.infoList.serviceType = '动态多时相';
              break;
            case '2':
              state.infoList.serviceType = '地形数据集';
              break;
          }
        });
      };

      //初始化数据
      const initData = () => {
        state.infoList = [];
        getServiceInfo();
      };

      onMounted(() => {
        //Global.Logger().info('我是服务信息模块，我执行了');
        initData();
      });

      return {
        activeKey,
        ...toRefs(state)
      };
    }
  });
</script>
