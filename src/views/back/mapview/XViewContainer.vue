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
import { storeToRefs } from 'pinia';
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
import {GeoJSON} from 'ol/format';
import {appStore} from '@/store';
import PlotOL,{PlotTypes} from 'xgis-plot';
import 'xgis-ol/dist/index.css';

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
        const appState = appStore();
        const { layoutContentHeight, layoutContentWidth } = storeToRefs(appState);
        // const layoutContentHeight=ref(document.body.clientHeight);
        // const layoutContentWidth=ref(document.body.clientWidth);
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
        let plotHelper:PlotOL;
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
         
            plotHelper=new PlotOL(xMap.map,{layerName:'plot-drawLayer'});
            plotHelper.activate(PlotTypes.ELLIPSE);
            // setTimeout(() => {
            //     plotHelper.activate('Arc');
            // }, 6000);
            setTimeout(() => {
            //     plotHelper.setAttributeField('test',121212);
            //     plotHelper.setAttributeField('WM123','897878');
            //    Global.Logger().debug(plotHelper.getAttributeField('test'),'当前要素属性值') ;
                // Global.Logger().debug('PlotDraw绘制结束geojson数据', plotHelper.plotUtils.getFeaturePlotJson(plotHelper.getCurrentFeature()));
                // plotHelper.removeFeature();
                const ttt={
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    98.40312500000002,
                    41.70703125
                ],
                [
                    98.37017290637057,
                    42.15404578844599
                ],
                [
                    98.2714466723414,
                    42.599296164730255
                ],
                [
                    98.10733592525449,
                    43.041025179033134
                ],
                [
                    97.87848833525352,
                    43.477489528741984
                ],
                [
                    97.58580705922573,
                    43.906966688470085
                ],
                [
                    97.23044717645422,
                    44.327761708077446
                ],
                [
                    96.81381113004781,
                    44.738213901864626
                ],
                [
                    96.33754319213875,
                    45.13670340254053
                ],
                [
                    95.80352297469187,
                    45.521657554098525
                ],
                [
                    95.21385801153478,
                    45.89155711837122
                ],
                [
                    94.57087544088478,
                    46.24494227076948
                ],
                [
                    93.87711282119741,
                    46.5804183615431
                ],
                [
                    93.1353081165826,
                    46.89666141982626
                ],
                [
                    92.34838889131115,
                    47.19242337874561
                ],
                [
                    91.51946075605596,
                    47.466537000970085
                ],
                [
                    90.65179511146569,
                    47.71792048526337
                ],
                [
                    89.74881623744076,
                    47.94558173585915
                ],
                [
                    88.81408777906519,
                    48.14862227780985
                ],
                [
                    87.85129868252736,
                    48.32624080285679
                ],
                [
                    86.86424863653478,
                    48.4777363318278
                ],
                [
                    85.85683307667874,
                    48.60251098108176
                ],
                [
                    84.8330278119296,
                    48.700072322082164
                ],
                [
                    83.79687333393518,
                    48.77003532478764
                ],
                [
                    82.75245887104617,
                    48.81212387718955
                ],
                [
                    81.70390625000002,
                    48.826171875
                ],
                [
                    80.65535362895386,
                    48.81212387718955
                ],
                [
                    79.61093916606487,
                    48.77003532478764
                ],
                [
                    78.57478468807044,
                    48.70007232208217
                ],
                [
                    77.5509794233213,
                    48.60251098108176
                ],
                [
                    76.54356386346525,
                    48.4777363318278
                ],
                [
                    75.55651381747268,
                    48.32624080285679
                ],
                [
                    74.59372472093484,
                    48.14862227780985
                ],
                [
                    73.65899626255926,
                    47.94558173585914
                ],
                [
                    72.75601738853435,
                    47.71792048526337
                ],
                [
                    71.88835174394407,
                    47.466537000970085
                ],
                [
                    71.05942360868889,
                    47.19242337874561
                ],
                [
                    70.27250438341743,
                    46.89666141982626
                ],
                [
                    69.53069967880262,
                    46.58041836154311
                ],
                [
                    68.83693705911526,
                    46.244942270769485
                ],
                [
                    68.19395448846525,
                    45.891557118371225
                ],
                [
                    67.60428952530816,
                    45.521657554098525
                ],
                [
                    67.07026930786128,
                    45.13670340254053
                ],
                [
                    66.59400136995224,
                    44.73821390186463
                ],
                [
                    66.17736532354581,
                    44.327761708077446
                ],
                [
                    65.8220054407743,
                    43.906966688470085
                ],
                [
                    65.52932416474651,
                    43.477489528741984
                ],
                [
                    65.30047657474555,
                    43.041025179033134
                ],
                [
                    65.13636582765864,
                    42.599296164730255
                ],
                [
                    65.03763959362946,
                    42.15404578844599
                ],
                [
                    65.00468750000002,
                    41.70703125
                ],
                [
                    65.03763959362946,
                    41.26001671155401
                ],
                [
                    65.13636582765864,
                    40.814766335269745
                ],
                [
                    65.30047657474555,
                    40.37303732096686
                ],
                [
                    65.52932416474651,
                    39.936572971258016
                ],
                [
                    65.8220054407743,
                    39.507095811529915
                ],
                [
                    66.17736532354581,
                    39.086300791922554
                ],
                [
                    66.59400136995222,
                    38.675848598135374
                ],
                [
                    67.07026930786128,
                    38.27735909745947
                ],
                [
                    67.60428952530816,
                    37.89240494590148
                ],
                [
                    68.19395448846524,
                    37.52250538162878
                ],
                [
                    68.83693705911526,
                    37.16912022923052
                ],
                [
                    69.53069967880262,
                    36.8336441384569
                ],
                [
                    70.27250438341743,
                    36.51740108017374
                ],
                [
                    71.05942360868889,
                    36.22163912125439
                ],
                [
                    71.88835174394407,
                    35.947525499029915
                ],
                [
                    72.75601738853436,
                    35.69614201473663
                ],
                [
                    73.65899626255927,
                    35.46848076414086
                ],
                [
                    74.59372472093484,
                    35.26544022219015
                ],
                [
                    75.55651381747268,
                    35.08782169714321
                ],
                [
                    76.54356386346525,
                    34.9363261681722
                ],
                [
                    77.5509794233213,
                    34.81155151891824
                ],
                [
                    78.57478468807044,
                    34.71399017791783
                ],
                [
                    79.61093916606485,
                    34.64402717521236
                ],
                [
                    80.65535362895388,
                    34.60193862281045
                ],
                [
                    81.70390625000002,
                    34.587890625
                ],
                [
                    82.75245887104616,
                    34.60193862281045
                ],
                [
                    83.79687333393518,
                    34.64402717521236
                ],
                [
                    84.8330278119296,
                    34.71399017791783
                ],
                [
                    85.85683307667875,
                    34.81155151891824
                ],
                [
                    86.86424863653478,
                    34.9363261681722
                ],
                [
                    87.85129868252734,
                    35.08782169714321
                ],
                [
                    88.81408777906518,
                    35.26544022219015
                ],
                [
                    89.74881623744078,
                    35.46848076414086
                ],
                [
                    90.65179511146569,
                    35.69614201473663
                ],
                [
                    91.51946075605596,
                    35.947525499029915
                ],
                [
                    92.34838889131113,
                    36.22163912125439
                ],
                [
                    93.1353081165826,
                    36.517401080173734
                ],
                [
                    93.87711282119741,
                    36.83364413845689
                ],
                [
                    94.57087544088478,
                    37.16912022923052
                ],
                [
                    95.21385801153478,
                    37.522505381628775
                ],
                [
                    95.80352297469186,
                    37.892404945901475
                ],
                [
                    96.33754319213875,
                    38.27735909745946
                ],
                [
                    96.8138111300478,
                    38.67584859813537
                ],
                [
                    97.23044717645422,
                    39.086300791922554
                ],
                [
                    97.58580705922573,
                    39.507095811529915
                ],
                [
                    97.87848833525352,
                    39.93657297125801
                ],
                [
                    98.10733592525449,
                    40.373037320966866
                ],
                [
                    98.2714466723414,
                    40.814766335269745
                ],
                [
                    98.37017290637057,
                    41.26001671155401
                ],
                [
                    98.40312500000002,
                    41.70703125
                ]
            ]
        ]
    },
    "properties": {
        "isPlot": true,
        "plotType": "Ellipse",
        "points": [
            [
                65.00468750000002,
                48.826171875
            ],
            [
                98.40312500000002,
                34.587890625
            ]
        ]
    }
}
//  const ddd=new GeoJSON().readFeature(ttt);
plotHelper.addFeatures([ttt]);
//              Global.Logger().debug(plotHelper.getAllFeatures(),'所有要素数据')
            }, 4000);
            // setTimeout(() => {
            //     plotHelper.removeAllFeatures();
            // }, 12000);
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
