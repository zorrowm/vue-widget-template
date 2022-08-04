<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane v-for="item in data" :tab="item.Name" :key="item.Id">
      <sys-list :roleId="item.Id" />
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { IExtraProperty } from '@/models/IModalModels';
import { defineComponent, ref } from "vue";
import SysList from "../components/sysList.vue";
import { object,arrayOf,any } from "vue-types";


const name = 'roleInfo';
export default defineComponent({
  name,
  props: {
    data:arrayOf(any()).def([]),
    extra: object<IExtraProperty>().isRequired,
  },
  components: { SysList },
  setup(props, { emit }) {
    const roleArr: any[] = props.data;
    const activeKey = ref(roleArr.length > 0 ? roleArr[0].Id : "");

    return {
      activeKey,
    };
  },
});
</script>

<style>
</style>
