import { IModalConfig } from '@/models/IModalModels';

/**
 * modal窗体配置项
 */
const modalsConfig: Array<IModalConfig> = [];
const components = import.meta.glob('./*.ts',{eager:true});
Object.keys(components).forEach(path => {
  //const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const comp=components[path] as any;
  modalsConfig.push(...comp.default);
});

export default modalsConfig;
