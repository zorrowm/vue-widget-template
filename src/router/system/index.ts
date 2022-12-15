
const routesCofig: Array<RouteRecordRaw> = [];
const components = import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  routesCofig.push(...components[path].default);
});
export default routesCofig;
