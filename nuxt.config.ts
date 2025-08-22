import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
    strict: true
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
    public: 'shared/public'
  },

  serverDir: 'app/server',

  pinia: {
    storesDirs: ['entities/**/model', 'app/store']
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@pinia/nuxt'
  ],

  css: [
    '~/shared/assets/styles/global.css'
  ]
})
