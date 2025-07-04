// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      title: 'アジ鯖公式サイト',
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@nuxt/image'],
  css: [
    "bootstrap-icons/font/bootstrap-icons.css",
    '@/assets/styles/markdown.css',
  ],
  app: {
    head: {
      title: 'アジ鯖公式サイト',
      htmlAttrs: { lang: 'ja' },
      meta: [{ name: 'description', content: 'アジ鯖、たのしい。｜Minecraftマルチプレイサーバー アジ鯖の公式ホームページです。' }],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
})