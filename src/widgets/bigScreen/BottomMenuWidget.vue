<template>
  <div ref="footerMenu" class="footer" v-show="isVisible">
    <div class="layoutfooter">
      <div class="menuContainer"><MainMenu /></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { OnEventHandler } from '@/events';
  import MainMenu from './components/MainMenu.vue';
  import { defineComponent, ref } from 'vue';
  import { SysEvents } from 'xframelib';

  const name = 'bottomMenuWidget';
  export default defineComponent({
    name: name,
    props: {},
    components: { MainMenu },
    setup() {
      // const footerMenu = ref<HTMLElement>();
      const isVisible = ref(true);
      function visibleChanged(data) {
        if (data.name === name) {
          isVisible.value = data.visible;
        }
      }
      OnEventHandler(SysEvents.WidgetVisibleChanged, visibleChanged);
      return {
        isVisible
      };
    }
  });
</script>

<style scoped lang="scss">
  .footer {
    height: var(--app-bottom-container-height);
    width: 100%;
  }
  .layoutfooter {
    width: 100%;
    height: 40px;
    padding: 0 !important;
    background-image: url('../img/home/bottomBack.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0px;
  }
  .menuContainer {
    margin: 0 auto;
    width: 44%; //38.55%;
    // margin-top: 10px;
    height: 30px;
  }
</style>
