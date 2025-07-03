// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/mdc',
    'vuetify-nuxt-module',
  ],
  css: [
    "bootstrap-icons/font/bootstrap-icons.css",
    '@/assets/styles/markdown.css',
    '@/assets/styles/global.css',
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
    '/terms': {redirect: '/rules/terms'},
    '/minecraft-all-srv-rule': {redirect: '/rules/global-server-rules'},
    '/discord-rule': {redirect: '/rules/discord'},
  },
  vuetify: {
    vuetifyOptions: {
      components: [
          'VCard', 'VCardItem', 'VCardActions', 'VCardText', 'VCardTitle', 'VCardSubtitle',
          'VExpansionPanels', 'VExpansionPanel', 'VExpansionPanelTitle', 'VExpansionPanelText',
      ],
      labComponents: true,
      directives: true,
    },
  },
  ssr: true,
})