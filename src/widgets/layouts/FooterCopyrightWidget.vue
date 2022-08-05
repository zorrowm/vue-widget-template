<template>
<div class="footerWidget">
    <div class="copyright" :style="getWrapStyle">{{ copyinfo }}</div>
    <span class="fl msginfo" :style="getMsginfoStyle">{{ statusInfo }}</span>
</div>
</template>

<script lang="ts">
import { OnStatusHandler } from '@/events';
import { defineComponent, ref,computed,CSSProperties } from 'vue';
import { Global } from 'xframelib';
import {appStore} from '@/store'

export default defineComponent({
    name: 'FooterCopyrightWidget',
    components: {},
    setup(props, { attrs, slots, emit }) {
        const appState = appStore();
        const copyinfo = ref(Global.Config.UI.CopyRight);
        const statusInfo = ref('提示：正在加载中……');//
        const getWrapStyle=computed(():CSSProperties=>{
            const footerHeight=appState.footerHeight+'px';
            return {
                height:footerHeight,
                lineHeight:footerHeight
            }
        });
        const getMsginfoStyle=computed(():CSSProperties=>{
            const footerHeight=appState.footerHeight+'px';
            return {marginTop:`-${footerHeight}`}
        });
            
        //监听：全局提示信息
        OnStatusHandler(data => {
            statusInfo.value = '提示：' + data;
        });
        return { copyinfo, statusInfo,getWrapStyle,getMsginfoStyle };
    }
});
</script>

<style scoped>
.footerWidget
{
    position: absolute;
    background-color: var(--footer-bg-color);
    bottom: 0px;
    width:100%;
    font-size: var(--footer-fontsize);
    color: var(--footer-copyright-fontcolor);
}
.msginfo {
    margin-left:5px;
    color: var(--footer-info-fontcolor);
    /* margin-top: -20px; */
}

.copyright {
    position: relative;
    text-align: center;
    bottom:0px;
}
</style>
