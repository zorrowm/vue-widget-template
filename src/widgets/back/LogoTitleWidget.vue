<template>
  <div class="logo" v-if="getShowLogo">
    <img src="/img/logo.png" alt="" />
    <h2 v-show="!leftCollapsed" class="title">{{ siteTitle }}</h2>
  </div>

</template>

<script lang="ts">
import FullScreen from '@/components/FullScreen.vue';
import { appStore } from '@/store';
import { storeToRefs } from 'pinia';
import { defineComponent, ref,computed } from 'vue';
import { Global } from "xframelib";
export default defineComponent({
  name: "LogoTitleWidget",
   components: { FullScreen},
  props: {
  },
  setup() {
    const siteTitle = ref(Global.Config.UI?.SiteTitle);
    const appState=appStore();
    const {leftCollapsed}=storeToRefs(appState);
    const getShowLogo=computed(()=>appState.showLogo)
    //居中显示标题
    const iscenterTitle=ref(appState.headerSetting.centerTitle);
   return {
      leftCollapsed,
      siteTitle,
      iscenterTitle,
      getShowLogo
    };
  },
});
</script>

<style lang="scss" scoped>
.logo {
  position:absolute;
  top:0px;
  left:0px;
  display: flex;
  align-items: center;
  padding:0 5px;
  height: var(--header-top-height);
  line-height: var(--header-top-height);
  overflow: hidden;
  white-space: nowrap;
  background-color: var(--header-logo-bgcolor);
  img {
    width: 28px;
    height:28px;
    margin:0 5px;
  }

  .title {
    color: var(--header-title-color);
    margin-bottom: 0;
    font-weight: normal;
    font-size: 32px;
    font-family: PangMenZhengDao;
  }
}
</style>
