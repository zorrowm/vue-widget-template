import { appStore } from '@/store';
import { storeToRefs } from 'pinia';
import {computed} from 'vue';
const appState=appStore();
const {layoutContentHeight,layoutContentWidth}=storeToRefs(appState);
const scrollRef=computed(()=>{
    const width=layoutContentWidth.value-30;
    const height=layoutContentHeight.value-125;
    return { x: width, y: height };
   });
export {scrollRef,layoutContentHeight};