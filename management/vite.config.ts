import type {UserConfig, ConfigEnv} from 'vite'
import {loadEnv} from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import styleImport from 'vite-plugin-style-import';
const CWD = process.cwd()

// 环境变量
const BASE_ENV_CONFIG = loadEnv('', CWD)
const DEV_ENV_CONFIG = loadEnv('development', CWD)
const PROD_ENV_CONFIG = loadEnv('production', CWD)

export default ({command, mode}: ConfigEnv): UserConfig => {
    // 环境变量
    const {VITE_BASE_URL, VITE_DROP_CONSOLE} = loadEnv(mode, CWD)

    // const isBuild = command === 'build';

    return {
      base: VITE_BASE_URL,
      esbuild: {
        // target: 'es2015'
      },
      resolve: {
        alias: [
          {
            find: '@',
            replacement: resolve(__dirname, './src')
          }
        ]
      },
      plugins: [
        vue(),
        vueJsx({
          // options are passed on to @vue/babel-plugin-jsx
        }),
        styleImport({
          libs: [
            {
              libraryName: 'ant-design-vue',
              esModule: true,
              resolveStyle: (name) => {
                return `ant-design-vue/es/${name}/style/index`
              }
            }
          ]
        })
      ],
      css: {
        preprocessorOptions: {
          less: {
            modifyVars: {},
            javascriptEnabled: true
          },
          scss: {
            additionalData: `@import "src/styles/global.scss";`
          }
        }
      },
      server: {
        port: 8088,
        proxy: {
            '/api': {
                // target: 'http://29135jo738.zicp.vip',
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/')
            }
        }
      },
      optimizeDeps: {
        include: [
          '@ant-design/icons-vue',
          'ant-design-vue/es/locale/zh_CN',
          'ant-design-vue/es/locale/en_US'
        ],
        exclude: ['vue-demi']
      },
      build: {
        terserOptions: {
          compress: {
            keep_infinity: true,
            drop_console: Boolean(VITE_DROP_CONSOLE)
          }
        }
      }
    }
}
