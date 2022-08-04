import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import visualizer from 'rollup-plugin-visualizer';
import { configCompressPlugin } from './compress';
import { configStyleImportPlugin } from './styleImport';
import { configVisualizerConfig } from './visualizer';
// import { configThemePlugin } from './theme';
import { configHmrPlugin } from './hmr';
import { configViteUnplugin } from './unplugin';
import cesium from 'vite-plugin-cesium';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // have to
    vueJsx()
    //三维
    // cesium()
  ];

  //unplugin-vue-components
  isBuild && vitePlugins.push(configViteUnplugin());
  //unplugin-auto-import
  // vitePlugins.push(pluginAutoImport);

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

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  //vite-plugin-theme
  // vitePlugins.push(configThemePlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    //VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
    // 打包依赖展示
    vitePlugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    );
  }

  return vitePlugins;
}
