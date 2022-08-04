<template>
    <div class="mapContainer">
        <div class="mainMapPanel">
            <div :id="mapIDRef" class="mainMapPanel"></div>
            <slot></slot>
            <!-- 底部状态栏 -->
            <div class="mapStateLine">
                <span>{{ zoomInfo }}</span>
                <span style="margin-left: 10px">{{ centerInfo }}</span>
                <span style="margin-left: 10px">{{ positionInfo }}</span>
            </div>
        </div>
        <div class="mapLeftPanel">
            <slot name="mapLeftPanel"></slot>
        </div>
        <div class="mapRightPanel">
            <slot name="mapRightPanel"></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { fromLonLat, Projection, toLonLat } from 'ol/proj';
import { ViewOptions } from 'ol/view';
import { emit } from 'process';
import { defineComponent, onMounted, ref,reactive, toRefs } from 'vue';
import { array, bool, object, oneOfType, string } from 'vue-types';
import { WMTSTool, XMap } from 'xgis-ol';
import {Global} from 'xframelib'
export default defineComponent({
    name: 'myOLMap',
    props: {
        mapid:string().def('map'),//地图容器ID
        mapgroup: string().def('map'),//地图所属组
        hasLayerManager: bool().def(false),//是否需要图层管理
        initTDTLayers: array<String>().def(['img_w', 'cia_w']),//默认加载天地图图层
        viewProjection: oneOfType([String, Projection]).def('EPSG:3857'),//默认地图视图投影
        defaultCenter: array<Number>().def([108.95, 34.5]),//默认经纬度中心点，默认为中国中心点
        viewOptions: object<ViewOptions>()//视图初始化选项
    },
    emits: ['mapInited'],
    setup(props, context) {
        //地图位置状态
        const mapStatus = reactive({
            zoomInfo: '',//地图级别
            centerInfo: '',//地图中心点
            positionInfo: '',//鼠标位置点
        });
        const mapid = props.mapid;
        const mapIDRef=ref(props.mapid);
        const mapGroup = props.mapgroup as string;
        const prj = props.viewProjection;
        const viewOptions = props.viewOptions ?? {
            projection: prj,
            center: fromLonLat(props.defaultCenter, prj),
            zoom: 3
        } as ViewOptions;
        //默认给个中心点
        if (!viewOptions.center && props.defaultCenter) {
            viewOptions.center = fromLonLat(props.defaultCenter, viewOptions.projection);
        }
        //获取和自定义的投影信息
        const xmap: XMap = new XMap(mapid, mapGroup, props.hasLayerManager);
        //获得天地图别名
        function getTDTAlias(layerName: string) {
            let aliasName = '';
            switch (layerName) {
                case 'vec_c':
                case 'vec_w':
                    aliasName = '矢量'
                    break;
                case 'img_c':
                case 'img_w':
                    aliasName = '矢量'
                    break;
                case 'cva_c':
                case 'cva_w':
                    aliasName = '矢量注记'
                    break;
                case 'cia_c':
                case 'cia_w':
                    aliasName = '影像注记'
                    break;
                case 'ter_c':
                case 'ter_w':
                    aliasName = '地形'
                    break;
                case 'cta_c':
                case 'cta_w':
                    aliasName = '地形注记'
                    break;
            }
            return aliasName;
        }
        function getMapState() {
            if (xmap) {
                const view = xmap.map?.getView();
                if (view) {
                    const zoom = view.getZoom()?.toFixed(1);
                    mapStatus.zoomInfo = `级别：${zoom} `;
                    const viewCenter = view.getCenter();
                    let center = viewCenter;
                    if (center) {
                        const prj = view.getProjection();
                        center = toLonLat(center, prj);
                        mapStatus.centerInfo = `中心点 经度：${center[0].toFixed(4)} 纬度：${center[1].toFixed(4)} `;
                    }
                }
            }
        }
        /**
         * 鼠标位置
         */
        function pointerMoveHandler(evt) {
            if (xmap) {
                const view = xmap.map.getView();
                if (view) {
                    const prj = view.getProjection();
                    let position = evt.coordinate;
                    position = toLonLat(position, prj);
                    mapStatus.positionInfo = `鼠标位置：${position[0].toFixed(4)} ,${position[1].toFixed(4)} `;
                }
            }
        }
        onMounted(() => {
            //初始化地图
            xmap.initMapView(viewOptions);
            //默认：加载天地图图层
            let wmtsTool: any = undefined;
            if (props.initTDTLayers) {
                const tdtLayers = props.initTDTLayers as string[];
                if (tdtLayers && tdtLayers.length > 0) {
                    const tdtKeys = Global.Config.MapKeys?.TDTKey as string[];
                    wmtsTool = new WMTSTool(xmap, tdtKeys);
                    tdtLayers.forEach(item => {
                        const layerName = item.toLocaleLowerCase();
                        const aliasName = getTDTAlias(layerName);
                        wmtsTool.addTDTLayer(item, aliasName);
                    })
                }
            }
            //地图初始化事件
            emit("mapInited", {
                xmap,
                wmtsTool
            });
            xmap.map.on('wheel', getMapState);
            xmap.map.on('pointerdrag', getMapState);
            xmap.map.on('pointermove', pointerMoveHandler);
        })
        return {
            ...toRefs(mapStatus),
            mapIDRef,
        }
    },
});
</script>
<style scoped lang='scss'>
.mapContainer {
    width: 100%;
    height: 100%;
    position: relative;
}

.mainMapPanel {
    width: 100%;
    height: 100%;
    position: relative;
}

.mapLeftPanel {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 200px;
    height: 100%;
    border: 1px solid #0f0;
    // background-color: aquamarine;
}

.mapRightPanel {
    position: absolute;   
    top: 0px;
    right: 0px;
    width: 100px;
    height: 100%;
    // background-color: #eee;
    border: 1px solid #00f;
}

.mapStateLine {
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 40px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    color: #ffe;
    background-color: rgba(255, 255, 255, 0.4);
}
</style>