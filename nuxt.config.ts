// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/google-fonts'
  ],
  css: ['~/assets/css/globals.css'],
  googleFonts: {
    families: {
      "Noto Sans JP": [400, 600, 700]
    }
  }
})