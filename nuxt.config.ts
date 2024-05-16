import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  devtools: { enabled: false },
  build: {
    transpile: ['vuetify/']
  },
  modules: [
    '@nuxtjs/eslint-module',
    (_options: any, nuxt: any) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-lodash'
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  lodash: {
    alias: [['camelCase', 'stringToCamelCase']]
  },
  ssr: false,
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  }
});
