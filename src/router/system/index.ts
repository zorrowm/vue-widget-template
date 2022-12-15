
const routesCofig: Array<RouteRecordRaw> = [];
const components = import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  const comp=components[path] as any;
  routesCofig.push(...comp.default);
});
export default routesCofig;
