
const routesCofig: Array<RouteRecordRaw> = [];
const components = import.meta.globEager('./*.ts');
Object.keys(components).forEach(path => {
  routesCofig.push(...components[path].default);
});
export default routesCofig;
