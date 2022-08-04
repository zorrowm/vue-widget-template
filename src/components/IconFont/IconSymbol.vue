<template>
  <svg :class="iconClass" aria-hidden="true">
    <use :xlink:href="iconHref"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { string } from "vue-types";
export default defineComponent({
  name: "IconSymbol",
  props: {
    icon: string().isRequired,
    class:string()
  },
  components: {},
  setup(props, { attrs, slots, emit }) {
    const iconHref = computed(() => {
      let hrefID=props.icon;
      if(props.icon.startsWith('#icon-')){
        hrefID=props.icon;
      }
      else if(props.icon.startsWith('icon-')){
         hrefID='#'+props.icon;
      }
      else {
        hrefID='#icon-'+props.icon;
      }
      return hrefID;
    });
    const iconClass=computed(()=>{
      let result='icon';
      if(props.class)
      {
       result=`${result} ${props.class}`
      }
      return iconClass;
    })
    return {
      iconHref,iconClass
    };
  },
});
</script>
<style>
.icon {
  display: block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  margin-right: 10px;
}
</style>
