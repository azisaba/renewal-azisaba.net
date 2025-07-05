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
    '/minecraft-server-policy': {redirect: '/rules/minecraft-server-policy'},
    '/minecraft-all-srv-rule': {redirect: '/rules/global-server-rules'},
    '/minecraft-srvs-rule': {redirect: '/rules/server-rules'},
    '/discord-rule': {redirect: '/rules/discord'},
    '/operating-terms-and-conditions': {redirect: '/rules/operating-terms-and-conditions'},
    '/fanfic-guidelines': {redirect: '/rules/derivative-works-guidelines'},
    '/chat-guideline': {redirect: '/rules/chat-guidelines'},
    '/help/rule-faq': {redirect: '/rules/faq'},
    '/notes-on-donations': {redirect: '/donation/note'},
    '/usage-of-donations': {redirect: '/donation/usage'},
    '/act-of-specified-commercial-transactions': {redirect: '/donation/commercial-transactions'},
    '/server-intro/**': {redirect: '/servers/**'},
  },
  vuetify: {
    vuetifyOptions: {
      components: [
          'VCard', 'VCardItem', 'VCardActions', 'VCardText', 'VCardTitle', 'VCardSubtitle',
          'VExpansionPanels', 'VExpansionPanel', 'VExpansionPanelTitle', 'VExpansionPanelText',
          'VCarousel', 'VCarouselItem',
      ],
      labComponents: true,
      directives: true,
    },
  },
  ssr: true,
})