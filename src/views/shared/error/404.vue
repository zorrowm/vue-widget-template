<template>
  <div class="page-container">
    <div
      style="
        background-image: url(./img/404.gif);
        background-size: contain;
        width: 400px;
        height: 176px;
      "
    ></div>
    <br />
    <div>
      <h1>当前页面不存在...</h1>
      <router-link to="/">返回首页?</router-link>
      <a-button type="link" size="large" @click="doLogout">退出系统?</a-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, createVNode } from 'vue';
  import { Modal } from 'ant-design-vue';
  import {logout,clearRight,Global } from 'xframelib'
  // import QuestionCircleOutlined from '@iconify-icons/ant-design/question-circle-outlined';
  export default defineComponent({
    name: '404',
    setup() {
      // 退出登录
      const doLogout = () => {
        Modal.confirm({
          title: '您确定要退出登录吗？',
          // icon: createVNode(QuestionCircleOutlined, {
          //   class: 'anticon anticon-question-circle'
          // }),
          onOk: () => {
            logout();
            clearRight();
            Global.Message?.msg('成功退出登录');
            window.open(window.location.pathname, '_self');
          }
        });
      };
      return {
        doLogout
      };
    }
  });
</script>

<style scoped>
  .page-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }
</style>
