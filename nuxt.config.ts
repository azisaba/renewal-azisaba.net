// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@nuxt/image'],
  css: [
    "bootstrap-icons/font/bootstrap-icons.css",
    '@/assets/styles/markdown.css',
  ],
  app: {
    head: {
      meta: [{ name: 'description', content: 'Nuxt 3 for beginners' }],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
})