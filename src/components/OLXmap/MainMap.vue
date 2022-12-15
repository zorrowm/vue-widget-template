<template>
    <div>
     <div id="map"></div>

    </div>
</template>

<script lang='ts'>
import { defineComponent,reactive, toRefs, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
    name: 'index',
    setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({

    })
    onBeforeMount(() => {
        Global.Logger().debug('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
    })
    return {
        ...toRefs(state),
    }
  },
});
</script>
<style scoped lang='scss'>

</style>