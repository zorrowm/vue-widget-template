import { RouteRecordRaw } from 'vue-router';
const menuCofig: Array<RouteRecordRaw> = [];
let tmpMenuArray: Array<RouteRecordRaw> = [];

const components = import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  tmpMenuArray.push(...components[path].default);
});
tmpMenuArray = tmpMenuArray.sort((a, b) => {
  let indexA: number = 0;
  let indexB: number = 0;
  if (a.meta) {
    if(a.meta.index != undefined)
    indexA = Number(a.meta.index);
    else
    indexA =100;
  }
  if (b.meta) {
    if(b.meta.index != undefined)
    indexB = Number(b.meta.index);
    else
    indexB =100;
  }
  return indexA - indexB;
});
menuCofig.push(...tmpMenuArray);
tmpMenuArray.length = 0;
export default menuCofig;
