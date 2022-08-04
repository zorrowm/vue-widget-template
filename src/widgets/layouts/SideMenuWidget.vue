<template>
    
 <a-layout-sider v-model:collapsed="leftCollapsed" :trigger="null" collapsible class="sideMenuDiv"
       :collapsedWidth="collapsedWidth" :width="sideWidth">
      <side-menu :collapsed="leftCollapsed" layout-name="BackLayout" />
  </a-layout-sider>
</template>

<script lang='ts'>
import SideMenu from '@/components/Menu/SideMenu/index.vue';
import { appStore } from '@/store';
import { storeToRefs } from 'pinia';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    name: 'SideMenuWidget',
    components:{SideMenu},
    setup(props, context) {
   const appState=appStore();
    const {leftCollapsed}=storeToRefs(appState);
    const collapsedWidth=ref(appState.menuSetting?.minWidth);
    const sideWidth=ref(appState.menuSetting?.menuWidth);
    onMounted(() => {
    })
    return {
        leftCollapsed,
        sideWidth,
        collapsedWidth
    }
  },
});
</script>
<style  lang='scss'>
.sideMenuDiv
{
  height:calc(100vh - var(--header-top-height));
  background-color: var(--sider-panel-bg-color); 
  overflow-x: hidden;
  overflow-y: auto;
}
</style>