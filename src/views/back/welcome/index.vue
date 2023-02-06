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
  </div>
</template>

<script lang="ts">
import BrowserType from "@/utils/browser-type";
import { Badge, Descriptions } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import {Icon} from '@iconify/vue'
export default defineComponent({
  name: "Welcome",
  components: {
    [Badge.name]: Badge,
    [Descriptions.name]: Descriptions,
    [Descriptions.Item.name]: Descriptions.Item,Icon
  },
  setup() {
    // 获取浏览器信息
    const browserInfo = ref(BrowserType("zh-cn"));

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

    return {
      browserInfo,
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
