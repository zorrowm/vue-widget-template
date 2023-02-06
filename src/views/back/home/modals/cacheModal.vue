<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
    <a-form-item label="是否覆盖" name="IsRepair">
      <a-radio-group v-model:value="formState.IsRepair">
        <a-radio :value="true">是</a-radio>
        <a-radio :value="false">否</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="预缓存级别" name="cacheMaxLevel" v-if="isSmallPreCache">
      <a-input-number v-model:value="formState.cacheMaxLevel" :min="numberMin" :max="numberMax" />
    </a-form-item>
    <a-form-item label="预缓存设置">
      <a-radio-group v-model:value="setScope">
        <a-radio :value="true">服务全部范围</a-radio>
        <a-radio :value="false">自定义范围</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="四至范围">
      <a-form-item label="上" class="scopeBox" name="yMax">
        <a-input-number v-model:value="formState.yMax" :disabled="setScope" style="width: 100%" />
      </a-form-item>
      <a-form-item label="下" class="scopeBox" name="yMin">
        <a-input-number v-model:value="formState.yMin" :disabled="setScope" style="width: 100%" />
      </a-form-item>
      <a-form-item label="左" class="scopeBox" name="xMin">
        <a-input-number v-model:value="formState.xMin" :disabled="setScope" style="width: 100%" />
      </a-form-item>
      <a-form-item label="右" class="scopeBox" name="xMax">
        <a-input-number v-model:value="formState.xMax" :disabled="setScope" style="width: 100%" />
      </a-form-item>
    </a-form-item>
    <a-form-item label="预缓存瓦片数量" v-if="isSmallPreCache">
      {{ cacheCount }}
      <a-button type="primary" @click="getCacheCount()">获取</a-button>
    </a-form-item>
    <!-- <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">确定</a-button>
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
    onUnmounted,
    computed
  } from 'vue';
  import { GlobalHprose, ProxyClient, Global } from 'xframelib';

  import ServiceInfoService from '@/service/imageAdminDefault/ServiceInfoService';
  import { DatasetService } from '@/service/dataSource/DatasetService';
  import ServiceClients from '@/service/index';
  import { TilesPreCacheService } from '@/service/dataSource/TilesPreCacheService';
  import { EmitMsg, OffEventHandler, OnEventHandler } from '@/events';
  import TableEvent from '@/events/modules/TableEvent';
  import { IExtraProperty } from '@/models/IModalModels';
  import {object} from 'vue-types'

  interface FormState {
    layer: string;
    IsRepair: boolean;
    cacheMaxLevel: number;
    xMin: any;
    yMin: any;
    xMax: any;
    yMax: any;
  }
  const name = 'cacheModal';
  interface IExtrachoose extends IExtraProperty {
    isSmallPreCache?: boolean;
    isRebuildThumbnail?: boolean;
  }
  export default defineComponent({
    name,

    components: {},
    props: {
      data: {
        type: Object,
        default: {}
      },
      extra:object<IExtrachoose>()
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
      const isSmallPreCache = computed(() => {
        return props.extra?.isSmallPreCache;
      });
      const isRebuildThumbnail = computed(() => {
        return props.extra?.isRebuildThumbnail;
      });
      let service = new TilesPreCacheService(ServiceClients.DatasetClient);
      let service2 = new DatasetService(ServiceClients.DatasetClient);
      const formRef = ref();
      const formState: UnwrapRef<FormState> = reactive({
        layer: props.data.name,
        IsRepair: true,
        cacheMaxLevel: 6,
        xMin: null,
        yMin: null,
        xMax: null,
        yMax: null
      });
      const state = reactive({
        numberMin: 1,
        numberMax: 22,
        setScope: true,
        cacheCount: null,
        serviceURL: Global.Config.ServiceURL.DefaultHproseAPI
      });
      //初始化数据
      const initData = () => {
        state.numberMin = props.data.minlevel;
        state.numberMax = props.data.maxlevel;
        if (props.data.minlevel > 6) {
          formState.cacheMaxLevel = props.data.minlevel;
        } else if (props.data.maxlevel < 6) {
          formState.cacheMaxLevel = props.data.maxlevel;
        }
        getScope();
      };
      //小级别瓦片缓存
      const tilesPreCache = () => {
        let layer = 's:' + props.data.name;
        service
          .TilesPreCache(
            layer,
            formState.cacheMaxLevel,
            formState.xMin,
            formState.yMin,
            formState.xMax,
            formState.yMax,
            formState.IsRepair
          )
          .then(res => {
            //Global.Logger().info(res, "res小级别瓦片缓存");
            if (res.value === true) {
              Global.Message?.msg('预缓存成功!');
              emit('preCache', true);
              formRef.value.resetFields();
              state.cacheCount = null;
            } else {
              Global.Message?.err('预缓存失败!');
            }
          });
      };
      //获取元数据
      const getScope = () => {
        let url = state.serviceURL.split('').reverse().join('');
        url.slice(11);
        let url2 = url.split('').reverse().join('');
        //Global.Logger().info(url2, "11111");
        ServiceInfoService.GetServicemetadataAsync(url2, props.data.name).then(res => {
          //Global.Logger().info(res, "res获取元数据");
        });
        formState.xMin = props.data.xminv;
        formState.yMin = props.data.yminv;
        formState.xMax = props.data.xmaxv;
        formState.yMax = props.data.ymaxv;
      };
      //获取预缓存瓦片数量
      const getCacheCount = () => {
        service2
          .GetTilesPreCacheCountByLevelAsync2(
            props.data.rule,
            props.data.minlevel,
            formState.cacheMaxLevel,
            formState.xMin,
            formState.yMin,
            formState.xMax,
            formState.yMax
          )
          .then(res => {
            //Global.Logger().info(res, "res获取预缓存瓦片数量");
            state.cacheCount = res;
          });
      };
      //预缓存设置确认
      const onSubmit = () => {
        if (props.extra.isSmallPreCache) {
          tilesPreCache();
        } else if (props.extra.isRebuildThumbnail) {
          rebuildThumb();
        }
      };
      //服务缩略图重建
      const rebuildThumb = () => {
        ServiceInfoService.ReconstructionServiceThumb(
          props.data.name,
          '',
          true,
          formState.xMin,
          formState.yMin,
          formState.xMax,
          formState.yMax
        ).then(res => {
          //Global.Logger().info(res, "res服务缩略图重建");
          if (res === true) {
            Global.Message?.msg('服务缩略图重建成功!');
            emit('preCache', true);
            formRef.value.resetFields();
            state.cacheCount = null;
          } else {
            Global.Message?.err('服务缩略图重建失败!');
          }
        });
      };
      //预缓存设置取消
      const onCancel = () => {
        formRef.value.resetFields();
        state.cacheCount = null;
        emit('preCache', true);
      };

      onMounted(() => {
        //Global.Logger().info("我是小级别预缓存页");
        initData();
      });

      return {
        formState,
        ...toRefs(state),
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
        getCacheCount,
        onSubmit,
        onCancel,
        formRef,
        isSmallPreCache,
        isRebuildThumbnail
      };
    }
  });
</script>

