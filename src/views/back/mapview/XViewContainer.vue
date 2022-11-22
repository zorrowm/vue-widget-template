<template>
    <XMapView :hasLayerTree="true" :viewHeight="layoutContentHeight" :TDTKeys="tdtkeysRef" :viewProjection="viewProjectionRef" 
    :viewWidth="layoutContentWidth"  @mapInited="mapInitedHandler" v-if="enableXMap" >
        <template #mapLeftPanelGroup>
            <div class="datapanel"  v-show="dataPanelVisible">
                <slot name="dataPanel"></slot>
            </div>
        </template>
        <template #extendMenuGroup>
            <div style="position:relative;">
                <MenuToolBar @locate="doLocation" />
                <DrawToolBar :xmap="mapRef" v-show="drawVisible" />
                <MeasureToolBar :xmap="mapRef" v-show="measureVisible" />
            </div>
            <div style="position:relative">
                <SwipeToolBar :xmap="mapRef" />
            </div>
            <!-- <div style="position:relative;margin-top:10px">
                <OtherTool :xmap="mapRef" @drag-box-feature="dragSearchHandler"></OtherTool>
            </div> -->
        </template>
    </XMapView>
    <div class="prjSelectBar">
    <a-radio-group v-model:value="PrjValue" option-type="button" :options="prjOptions" @change="prjChageHandler">
  </a-radio-group>
    </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { fromLonLat } from 'ol/proj';
// import { storeToRefs } from 'pinia';
import {
computed,
defineComponent,
onBeforeUnmount,
onMounted, ref,
onBeforeMount
} from 'vue';
import { useRoute } from 'vue-router';
import { Global, H5Tool } from 'xframelib';
import {
DrawToolBar, mapMenuState, MeasureToolBar, MenuToolBar, SwipeToolBar, WMTSTool, XMap, XMapView,PrjGridTool,
DrawFeatureTool} from 'xgis-ol';
import 'xgis-ol/dist/index.css';
// import {OnEventHandler,OffEventHandler, EmitMsg} from '@/events';

export default defineComponent({
    name: 'xViewContainer',
    props: {},
    components: {
        Icon,
        DrawToolBar, MeasureToolBar, MenuToolBar, SwipeToolBar,
        XMapView
    },
    setup(props, { attrs, slots, emit }) {
        const tdtkeysRef=ref<string[]>(Global.Config.MapKeys?.TDTKey);
        //当前图层的信息
        // const imgLayerInfoState=imgLayerInfoStore();
        // const appState = appStore();
        // const { layoutContentHeight, layoutContentWidth } = storeToRefs(appState);
        const layoutContentHeight=ref(document.body.clientHeight);
        const layoutContentWidth=ref(document.body.clientWidth);
        const currentRoute = useRoute();
        const viewProjectionRef=ref<string|any>();
        const  prjOptions = [
            { label: '经纬度', value: 'C' },
            { label: '墨卡托', value: 'W' },
        ];
        
        const PrjValue=ref<string>('C');
        const enableXMap=ref(false);
        //获取路由参数
        const serviceID = currentRoute.query.id as string;
        const serviceType = currentRoute.query?.type?.toString();
        //初始化请求
        initByServiceID();
        //必须要有
        const mapRef=ref();
        let wmtsRes: any;
        let xMap: XMap;
        function mapInitedHandler(res) {
            xMap = res.xmap;
            mapRef.value=xMap;//必须要有
            //全局存储
            Global.xMap=res.xmap;
            if (wmtsRes) {
                const layerName = serviceType + ':' + serviceID;
                const wmtsLayer=WMTSTool.addWMTSLayerSelf(xMap, wmtsRes, layerName);
                // imgLayerInfoState.init(layerName,wmtsRes);
               const debugLayer=WMTSTool.addWMTSDebugLayer(xMap,wmtsLayer);
                debugLayer.setVisible(false);
                 //保存Debug图层
                Global.DebugLayer = debugLayer;
                //绘制图层
                Global.DrawFeatureTool=new DrawFeatureTool(xMap);
            }
        }
        function zoomToExtent(extent)
        {
            if(xMap)
            {
                xMap.zoomToExtent(extent);
            }
        }
        let defaultPrjValue:string='C';
        let defaultPrjObj:Projection;
         function initByServiceID()
         {
                //请求参数解析
                if (serviceID) {
                // ServiceHelper.GetServiceBrowseAsync(serviceID, serviceType + ':').then(res => {
                //     if (res) {
                //         defaultPrjValue=res.tileSchema?.rule;
                //         const defaultIndex=prjOptions.findIndex(it=>it.value===defaultPrjValue);
                //         if(defaultIndex<0)
                //         prjOptions.push({ label: '默认', value: defaultPrjValue});
                //         PrjValue.value=defaultPrjValue;
                //         //加载地图
                //         wmtsRes = res;
                //         defaultPrjObj=PrjGridTool.getProjection(res.prjInfo);
                //         viewProjectionRef.value=defaultPrjObj;
                //         enableXMap.value=true;
                //         if (xMap) {
                //             const layerName = serviceType + ':' + serviceID;
                //             const wmtsLayer=WMTSTool.addWMTSLayerSelf(xMap, res, layerName);
                //             imgLayerInfoState.init(layerName,res);
                //             const debugLayer=WMTSTool.addWMTSDebugLayer(xMap,wmtsLayer);
                //             debugLayer.setVisible(false);
                //             //保存Debug图层
                //             Global.DebugLayer = debugLayer;
                //             //绘制图层
                //             Global.DrawFeatureTool=new DrawFeatureTool(xMap);
                //         }
                //     } else {
                //         Global.Message?.err('未获取到数据！');
                //     }
                // }
                // );
            }
         }
        
        onMounted(() => {
            enableXMap.value=true;
            H5Tool.windowResizeHandler(()=>{
                // layoutContentHeight.value=document.body.clientHeight;
                // layoutContentWidth.value=document.body.clientWidth;
            })
        });
        //释放资源
        onBeforeUnmount(() => {
            let map = xMap?.map;
            if (map) {
                map.dispose();
            }
            // OffEventHandler(SysMapEvent.ZoomToExtent, zoomToExtent);
        });

        const dataPanelVisible = computed(() => {
            return mapMenuState.dataPanel;
        });
        const drawVisible = computed(() => {
            return mapMenuState.drawTool;
        });
        const measureVisible = computed(() => {
            return mapMenuState.measureTool;
        });

        function doLocation(x: number, y: number, z: number | undefined) {
            if (xMap.map) {
                const view = xMap.map.getView();
                const prj = view.getProjection();
                const targetPoint = PrjGridTool.transformCoordinate([x, y],'EPSG:4326',prj);
                view.setCenter(targetPoint);
                if (z && z >= 0) view.setZoom(z);
            }
        }


        //批量删除
        let SelectIds: string[] = [];
        let isFinished = ref<boolean>(false);

        const GetSelectIds = (val: string[]) => {
            //console.log(val, '要删除的IDs');
        };
        const visibleBatchDelete = computed(() => {
            return SelectIds.length > 0;
        });
        /**
         * 切换投影
         * @param e 
         */
        function prjChageHandler(e)
        {
            const prjValue=PrjValue.value;
            if(prjValue===defaultPrjValue)
            viewProjectionRef.value=defaultPrjObj;
            else if(prjValue==="W")
            {
                viewProjectionRef.value="EPSG:3857";
            }
            else 
            {
                viewProjectionRef.value="EPSG:4326";
            }
        }
        /**
         * 拉框查询
         * @param geojson 要素JSON
         */
        function dragSearchHandler(geojson:any)
        {
            const tt=(serviceType==='l'?0:1);
            let isGeo=1;
            switch(PrjValue.value)
            {
                case 'C':
                    isGeo=1;
                    break;
                case 'W':
                isGeo=0;
                    break;
                default:
                    const isgeoprj=defaultPrjObj.getUnits()==='degrees';
                    isGeo=isgeoprj?1:0;
                    break;
            }
            //拉框查询结果，数组对象
            // ImageService.GetImageInfoByGeojson(serviceID,tt,geojson,1).then(res=>{
            //     EmitMsg(SystemsEvent.System_DragBoxSelect,res);
                
            // })
        }
       return {
            dataPanelVisible,
            drawVisible,
            measureVisible,
            doLocation,
            visibleBatchDelete,
            GetSelectIds,
            isFinished,
            mapInitedHandler,
            layoutContentHeight, 
            layoutContentWidth,
            mapRef,
            viewProjectionRef,
            enableXMap,
            PrjValue,
            prjOptions,
            prjChageHandler,
            dragSearchHandler,
            tdtkeysRef
        };
    }
});
</script>

<style scoped lang="scss">
.mainContent {
    width: 100%;
    background-color: #f00;
}



.extendmenu {
    position: absolute;
    top: 40px;
    right: 0.5em;
    height: 300px;
    // width: 30px;
    padding-left: 20px;
    z-index: 10;
    // background: #08213b;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.layerTree {
    position: absolute;
    top: 35px;
    border: 1px solid #c3c3c3;
    width: 300px;
    border-radius: 4px;
    /* z-index: 10; */
    font-size: 14px;
}

.datapanel {
    position: absolute;
    top: 35px;
    width: 300px !important;
    /* z-index: 10; */
    font-size: 14px;
    background-color: rgba(255, 255, 255, 1);
    width:90%;
}



.serviceName {
    font-weight: 600;
    font-size: 16px;
    margin-right: 10px;
}

.btn {
    cursor: pointer;
}

:deep(.measureToolList) {
    //   margin-right: 30px;
    //    margin-top: 100px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    flex-direction: row;
}

:deep(.drawToolList) {
    position: absolute;
    bottom: 60px;
    right: 30px;
    flex-direction: row;
}

:deep(.ol-zoom) {
    display: none;
}
.prjSelectBar
{
    float:right;
    margin-top:-55px;
}
</style>
