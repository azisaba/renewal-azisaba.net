// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@nuxt/image', '@nuxtjs/mdc'],
  css: [
    "bootstrap-icons/font/bootstrap-icons.css",
    '@/assets/styles/markdown.css',
  ],
  app: {
    head: {
      title: 'アジ鯖公式サイト',
      meta: [{ name: 'description', content: 'アジ鯖公式サイト' }],
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  mdc: {
    remarkPlugins: {
      'remark-breaks': {}
    }
  },
  routeRules: {
    '/terms': {
      redirect: '/rules/terms',
    },
  },
  ssr: true,
})