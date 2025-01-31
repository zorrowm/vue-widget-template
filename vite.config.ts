import type { UserConfig, ConfigEnv } from "vite";
import { loadEnv } from "vite";
import { resolve } from "path";
import { wrapperEnv } from "./vite-build/utils";
import { createVitePlugins } from "./vite-build/vite/plugin";
import { OUTPUT_DIR } from "./vite-build/constant";
import pkg from "./package.json";
import dayjs from "dayjs";

const { name, version } = pkg;
const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv;

  const isBuild = command === "build";
  //https://www.vitejs.net/config/#resolve-alias
  let defaultAlias = [
    // @/xxxx => src/xxxx
    {
      find: "@",
      replacement: resolve(__dirname, "./src"),
    },
    {
      find: "#",
      replacement: resolve(__dirname, "./types"),
    },
    // {
    //   find: 'vue-i18n',
    //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
    // },
  ];
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: defaultAlias,
    },
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      // proxy: createProxy(VITE_PROXY)
    },
    //https://vitejs.cn/vite3-cn/config/preview-options.html#preview-port
    preview: {
      port: 5173
    },
    build: {
      target: "esnext",
      outDir: OUTPUT_DIR,
      //https://www.vitejs.net/config/#build-options
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     // Used to delete console in production environment
      //     drop_console: VITE_DROP_CONSOLE
      //   }
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      // brotliSize: false,
      commonjsOptions: {
        // ignore built-in modules in Node.js  使用workerpool需要配置
        ignore: ['os', 'child_process', 'worker_threads']
      },
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        external: ["/img"],
        output: {
          manualChunks(id) {
            if (id.includes("/node_modules/")) {
              // 设置需要独立打包的npm包
              const expansions = [
                "axios",
                "xframelib",
                "ant-design-vue",
                "mapbox-gl",
                "ol",
                "echarts",
                "lodash-es",
                // '@hprose',
                "xgis-ol",
                "xgis-plot",
                "vue-router",
                "@iconify/vue",
                "@vue"//WM:必须要有，否则分包导出运行时报错
              ]; //, 'svelte-jsoneditor', 'mapbox-gl'
              const c = expansions.find((exp) =>
                id.includes(`/node_modules/${exp}`)
              );
              if (c) {
                return `${c}-exp`;
              } else {
                return "vendor";
              }
            }
          },
        },
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     // less: {
    //     //   // modifyVars: generateModifyVars(),
    //     //   javascriptEnabled: true,
    //     // },
    //   },
    // },

    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: [
        "ant-design-vue/es",
        "dayjs",
        //如果用到echarts最好要启用
        // "echarts/lib/core/echarts.js",
        // "echarts/lib/echarts",
        // "echarts/lib/chart/bar",
        // "echarts/lib/chart/line",
        // "echarts/lib/chart/pie",
        // "echarts/lib/component/legend",
        // "echarts/lib/component/title",
        // "echarts/lib/component/tooltip",
        // "echarts/lib/component/grid",
        // "echarts/lib/component/transform/sortTransform.js",
      ],
      exclude: ["vue-demi"],
    },
    define: {
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
