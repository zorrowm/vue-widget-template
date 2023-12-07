import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
import { configHmrPlugin } from './hmr';
import { configViteUnplugin } from './unplugin';
// import cesium from 'vite-plugin-cesium';
import pluginFS from "vite-plugin-fs";
// import mkcert from'vite-plugin-mkcert'


export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    //三维
    // cesium(),
    //启用https证书
    // mkcert({
    //   source: 'coding',
    // }),
  ];

  //unplugin-vue-components
   vitePlugins.push(configViteUnplugin());
  //unplugin-auto-import
  // vitePlugins.push(pluginAutoImport);
  //文件输出
  !isBuild &&vitePlugins.push(pluginFS());  
  // TODO
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy
  VITE_LEGACY &&
    isBuild &&
    vitePlugins.push(
      legacy({
        targets: ['chrome >= 70', 'ie >= 11'],
        modernPolyfills: true
      })
    );

  // The following plugins only work in the production environment
  if (isBuild) {


    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
    // 打包依赖展示
    // rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig());
  }

  return vitePlugins;
}
