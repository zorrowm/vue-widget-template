<template>
  <div>
    <div class="box">
			<Icon icon="mdi:home" />  Main 布局的默认测试页面！
      <a-descriptions title="系统信息" bordered>
        <!-- <a-descriptions-item key="IP" label="IP">
          {{ userInfo.IP }}
        </a-descriptions-item> -->
        <a-descriptions-item v-for="(value, key) in browserInfo" :key="key" :label="key">
          {{ value }}
        </a-descriptions-item>
        <a-descriptions-item label="网络状态">
          <a-badge :text="'在线'" />
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <a-input v-model:value="textMessage" placeholder="Basic usage" />
    <a-button type="primary" @click="doSend">发送消息</a-button>

    <a-textarea v-model:value="receiveContent" placeholder=""  />
  </div>
</template>

<script lang="ts">
import BrowserType from "@/utils/browser-type";
import { Client } from '@stomp/stompjs';
import { Badge, Descriptions } from "ant-design-vue";
import { defineComponent, onUnmounted, ref } from "vue";

export default defineComponent({
  name: "Welcome",
  components: {
    [Badge.name]: Badge,
    [Descriptions.name]: Descriptions,
    [Descriptions.Item.name]: Descriptions.Item
  },
  setup() {
    // 获取浏览器信息
    const browserInfo = ref(BrowserType("zh-cn"));
    const textMessage=ref('');
    const receiveContent=ref('');

  //是否连接成功
  let isConnected=false;
  const client = new Client({
  brokerURL: 'ws://192.168.1.121:61614',
  // connectHeaders: {
  //   login: 'user',
  //   passcode: 'password',
  // },
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onConnect = function (frame) {
  isConnected=true;
  // Do something, all subscribes must be done is this callback
  // This is needed because this will be executed after a (re)connect
  //监听
  client.subscribe('/topic/test01', message =>
      {
        console.log(`Received: ${message}`)
            receiveContent.value=`${message.body}`
      });
};

client.onStompError = function (frame) {
  isConnected=false;
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate();


onUnmounted(()=>{
  client.deactivate();
})

    // watchEffect(() => {
    //   Object.assign(browserInfo.value, {
    //     距离电池充满需要:
    //       Number.isFinite(battery.value.chargingTime) && battery.value.chargingTime != 0
    //         ? calcDischargingTime.value
    //         : '未知',
    //     剩余可使用时间:
    //       Number.isFinite(battery.value.dischargingTime) && battery.value.dischargingTime != 0
    //         ? calcDischargingTime.value
    //         : '未知',
    //     电池状态: batteryStatus.value,
    //     当前电量: battery.value.level + '%'
    //   })
    // })

    // Global.Logger().debug(performanceMonitor.getPerformanceData(), 'performanceMonitor')
    
    function doSend()
    {
      if(isConnected)
      {
        console.log("test02发送："+textMessage.value)
        client.publish({ destination: '/topic/test02', body: textMessage.value});
  
      }
    }
    return {
      browserInfo,
      textMessage,
      receiveContent,
      doSend
    };
  },
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 100%;
  height: calc(100vh - 280px);
  flex-direction: column;

  img {
    min-height: 0;
    flex: 1;
  }

  .ant-form {
    flex: 2;
  }
}
</style>
