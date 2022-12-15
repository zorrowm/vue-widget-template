import type { IWidgetConfig } from 'xframelib';
/**
 * 组件配置项
 */
const widgetCofig: Array<IWidgetConfig> = [];
const components = import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  //const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  //Global.Logger().debug(fileName, '....11111111');
  const comp =components[path] as any;
  widgetCofig.push(...comp.default);
});

export default widgetCofig;
