/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import Components from 'unplugin-vue-components/vite'
// 使用你所使用的UI组件库的 resolver
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configViteUnplugin() {
  const plugin = Components({
    resolvers: [
      AntDesignVueResolver(),
    ],
    dts: true,
    include: [/\.vue$/, /\.vue\?vue/]
  });
  return plugin;
}
