/**
 *  Introduces component library styles on demand.
https://github.com/vbenjs/vite-plugin-style-import/tree/main#readme
 */
//  import { UserConfigExport } from 'vite'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin(isBuild: boolean) {
  if (!isBuild) {
    return [];
  }

  const styleImportPlugin = createStyleImportPlugin({
    resolves: [AndDesignVueResolve()],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: name => {
          return `ant-design-vue/es/${name}/style/index`;
        }
      }
    ]
  });
  return styleImportPlugin;
}
