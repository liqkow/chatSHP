// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  target: 'static',
  generate: {
    fallback: true
  },
  devtools: { enabled: true },

  nitro: {
    experimental: {
      websocket: true,
    }
  }

})
