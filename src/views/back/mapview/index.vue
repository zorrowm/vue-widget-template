<template>
<XViewContainerVue>
    <!-- <template #dataPanel v-if="isInner">
        <serviceDataPanel @SelectIds="GetSelectIds" :isFinished="isFinished" :searchRef="searchRef" />
    </template> -->
</XViewContainerVue>
</template>

<script lang="ts">
import {
computed,
defineComponent, onMounted, ref
} from 'vue';
// import serviceDataPanel from './serviceDataPanel/index.vue';
import XViewContainerVue from './XViewContainer.vue';
// import GuestImageTopBar from './GuestImageTopBar.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'mapPreview',
    props: {},
    components: {
        XViewContainerVue,
        // serviceDataPanel,
        // GuestImageTopBar
    },
    setup(props, { attrs, slots, emit }) {
        //当前图层的信息
        const searchRef = ref('');
        const currentRoute = useRoute();
        //内部预览，还是外部预览
        const isInner=ref<boolean>(currentRoute.name!='mapguestview')
        onMounted(() => {

        });
        //批量删除
        let SelectIds: string[] = [];
        let isFinished = ref<boolean>(false);

        const GetSelectIds = (val: string[]) => {
            Global.Logger().debug(val, '要删除的IDs');
        };
        const visibleBatchDelete = computed(() => {
            return SelectIds.length > 0;
        });

       return {
            searchRef,
            visibleBatchDelete,
            GetSelectIds,
            isFinished,
            isInner
        };
    }
});
</script>

