<template>
  <div class="mainHeader">
    <div class="header">
      <div class="title titleword">
        <router-link to="/test" style="color: white">专题一</router-link>
      </div>
      <div class="title titleword">MAX</div>
      <div class="title titleword">
        <a aria-current="page" href="/demo1/index.html" target="_blank" style="color: white">
          专题二
        </a>
      </div>
      <div class="title titleword">
        <router-link to="/test2" style="color: white">专题三</router-link>
      </div>
    </div>
    <div class="titleInfo">
      <a aria-current="page" href="#/" style="text-decoration: none">{{ siteTitle }}</a>
    </div>
    <div class="rightMenu">
      <FullScreen :target="fullScreenElem" />
      <span>
        {{ username }}
      </span>
      <poweroff-outlined title="退出？" @click.prevent="doLogout" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, createVNode } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { QuestionCircleOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
  import { Global, logout } from 'xframelib';
  import FullScreen from '@/components/FullScreen.vue';

  export default defineComponent({
    name: 'HeaderTitleWidget',
    components: {
      FullScreen,
      PoweroffOutlined
    },
    setup() {
      const siteTitle = ref(Global.Config.UI?.SiteTitle);
      const username = ref(Global.User?.name);
      const fullScreenElem = ref(window.document.documentElement);
      // 退出登录
      const doLogout = () => {
        Modal.confirm({
          title: '您确定要退出登录吗？',
          icon: createVNode(QuestionCircleOutlined),
          onOk: () => {
            logout();
            Global.Message?.msg('成功退出登录');
            window.open(window.location.pathname, '_self');
          }
        });
      };

      return {
        siteTitle,
        username,
        doLogout,
        fullScreenElem
      };
    }
  });
</script>
<style scoped>
  .mainHeader {
    width: 100%;
    height: 77px;
    /* var(--app-top-container-height); */
    background-color: #001529;
    background-image: url('../img/home/titleBack.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
  }
  .titleInfo {
    margin-top: -60px;
    color: #59c8ff;
    font-size: 30px;
    font-weight: 600;
  }
  @media screen and (max-width: 1300px) and (min-width: 1000px) {
    .titleInfo {
      margin-top: -55px;
      color: #59c8ff;
      font-size: 24px;
    }
    /* .titleword {
    font-size: 2vmin;
  } */
  }
  @media screen and (max-width: 1000px) {
    .titleInfo {
      margin-top: -50px;
      color: #59c8ff;
      font-size: 18px;
    }
  }
  .header {
    width: 30%;
    height: 100%;
    line-height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .title {
    background-image: url('/img/home/titleContentBack.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    line-height: 100%;
    background-position: center;
  }
  .titleword {
    color: white;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rightMenu {
    position: absolute;
    top: 0;
    right: 20px;
    width: 120px;
    height: 100%;
    color: #59c8ff;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
