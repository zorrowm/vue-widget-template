
const routesCofig: Array<RouteRecordRaw> = [];
let tmpMenuArray: Array<RouteRecordRaw> = [];

const components = import.meta.globEager('./*.ts');
Object.keys(components).forEach(path => {
  tmpMenuArray.push(...components[path].default);
});
tmpMenuArray = tmpMenuArray.sort((a, b) => {
  let indexA: number = 0;
  let indexB: number = 0;
  if (a.meta && a.meta.index != undefined) {
    indexA = Number(a.meta.index);
  }
  if (b.meta && b.meta.index != undefined) {
    indexB = Number(b.meta.index);
  }
  return indexA - indexB;
});
routesCofig.push(...tmpMenuArray);
tmpMenuArray.length = 0;
export default routesCofig;
