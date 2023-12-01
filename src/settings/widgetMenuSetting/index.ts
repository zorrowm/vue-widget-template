import type { IWidgetMenu } from '@/models/IWidgetMenu';
const menuCofig: Array<IWidgetMenu> = [];
let tmpMenuArray: Array<IWidgetMenu> = [];

const components =import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  const comp=components[path] as any;
  tmpMenuArray.push(...comp.default);
});
tmpMenuArray = tmpMenuArray.sort((a, b) => {
  let indexA: number = 0;
  let indexB: number = 0;
  if (a.index != undefined) {
    indexA = Number(a.index);
  }
  if (b.index != undefined) {
    indexB = Number(b.index);
  }
  return indexA - indexB;
});
menuCofig.push(...tmpMenuArray);
tmpMenuArray.length = 0;
export default menuCofig;
