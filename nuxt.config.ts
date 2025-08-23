import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },

  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
    strict: true,
  },

  rootDir: '.',
  srcDir: '.',
  alias: {
    '~': fileURLToPath(new URL('./', import.meta.url)),
    '@': fileURLToPath(new URL('./', import.meta.url)),
  },

  dir: {
    app: 'app',
    layouts: 'app/layouts',
    middleware: 'app/middleware',
    pages: 'pages',
    assets: 'shared_slice/assets',
    public: 'shared_slice/public',
  },

  components: [
    '~/shared_slice/ui',
    // '~/entities/**/ui', // уберу пока не требуется, лишний warning
    '~/features',
    '~/widgets',
    '~/pages'
  ],

  serverDir: 'app/server',

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    'nuxt-svgo',
  ],

  pinia: {
    storesDirs: ['entities/**/model', 'app/store'],
  },

  css: [
    '~/shared_slice/assets/styles/global.css',
    '~/shared_slice/assets/styles/variables.css',
    '~/shared_slice/assets/styles/fonts.css',
  ],

  image: {
    dir: 'shared_slice/assets/images',
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_ASSETS_BASE_URL || '/',
    },
  },

  svgo: {
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              inlineStyles: {
                onlyMatchedOnce: false,
              },
              removeDoctype: false,
              removeViewBox: false,
            },
          },
        },
      ],
    },
  },
})
