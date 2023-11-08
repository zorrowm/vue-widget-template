<template>
  <template v-if="!menuInfo.meta.hidden">
    <a-menu-item :key="menuInfo.name">
      <div class="vitem">
        <Icon :icon="menuInfo.meta.icon" class="iconSelected"></Icon>
        <span class="fontSelect">{{ menuInfo.meta.title }}</span>
      </div>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'menu-item',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.vitem {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40px;
  line-height: 20px;
  margin-top: 10px;
  color: #999
}

.fontSelect {
  font-size: 12px;
  font-weight: 550;
}

.ant-menu-item-selected {
  .iconSelected {
    color: rgb(38, 168, 219);
  }

  .fontSelect {
    font-size: 12px;
    color: #fff;
  }
}
</style>
