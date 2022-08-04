<template>
<div class="footerWidget">
    <div class="copyright">{{ copyinfo }}</div>
    <span class="fl msginfo">{{ statusInfo }}</span>
</div>
</template>

<script lang="ts">
import { OnStatusHandler } from '@/events';
import { defineComponent, ref } from 'vue';
import { Global } from 'xframelib';

export default defineComponent({
    name: 'FooterCopyrightWidget',
    components: {},
    setup(props, { attrs, slots, emit }) {
        const copyinfo = ref(Global.Config.UI.CopyRight);
        const statusInfo = ref('提示：正在加载中……');//
        //监听：全局提示信息
        OnStatusHandler(data => {
            statusInfo.value = '提示：' + data;
        });
        return { copyinfo, statusInfo };
    }
});
</script>

<style scoped>
.footerWidget
{
    position: absolute;
    background-color: #aaa;
    bottom: 0px;
    width:100%;
    font-size: 8px;
    color: #333;
}
.msginfo {
    margin-left:5px;
    color: blue;
    margin-top:-20px;
}

.copyright {
    position: relative;
    text-align: center;
    line-height: 20px;
    bottom:0px;
}
</style>
