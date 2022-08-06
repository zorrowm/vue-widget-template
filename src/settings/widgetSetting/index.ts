import type { IWidgetConfig } from 'xframelib';
/**
 * 组件配置项
 */
const widgetCofig: Array<IWidgetConfig> = [];
const components = import.meta.globEager('./*.ts');
Object.keys(components).forEach(path => {
  //const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  //console.log(fileName, '....11111111');
  widgetCofig.push(...components[path].default);
});

export default widgetCofig;