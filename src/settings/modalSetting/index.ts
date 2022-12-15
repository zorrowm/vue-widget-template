import { IModalConfig } from './@/models/IModalModels.d';

/**
 * modal窗体配置项
 */
const modalsConfig: Array<IModalConfig> = [];
const components = import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  //const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  //console.log(fileName, '....11111111');
  modalsConfig.push(...components[path].default);
});

export default modalsConfig;
