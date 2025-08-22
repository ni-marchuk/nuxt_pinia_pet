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
    assets: 'shared/assets',
    public: 'shared/public',
  },

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
    '#shared/assets/styles/global.css',
    '#shared/assets/styles/variables.css',
    '#shared/assets/styles/fonts.css',
  ],

  image: {
    dir: 'shared/assets/images',
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
