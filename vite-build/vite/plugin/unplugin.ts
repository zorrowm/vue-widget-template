/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import Components from 'unplugin-vue-components/vite'
// 使用你所使用的UI组件库的 resolver
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configViteUnplugin(isBuild:boolean=false) {
        //参考：https://www.cnblogs.com/hushuguang/p/15919964.html
        //importStyle 指是否需要自动随引入加载对应的组件样式，我这里设置为 false，因为某些二级组件（比如 DateRangePicker）没办法准确地识别正确路径，他的搜寻路径都是按一级组件来写的，所以我改成了全量导入 css。
  const importStyleValue=isBuild?'less':false;
  const plugin = Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: importStyleValue, // 原来配置项'less'
        resolveIcons: false,
    }),
    ],
    dts: true,
    include: [/\.vue$/, /\.vue\?vue/]
  });
  return plugin;
}
