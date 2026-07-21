// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  nitro: {
    preset: "cloudflare_pages",
  },
  content: {
    database: {
      type: "d1",
      bindingName: "DB",
    },
  },
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/mdc",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "nuxt-og-image",
  ],
  css: [
    "bootstrap-icons/font/bootstrap-icons.css",
    "@/assets/styles/global.css",
    "@/assets/styles/markdown.css",
  ],
  runtimeConfig: {
    graphApiKey: "",
    tebexSecret: "",
  },
  app: {
    head: {
      title: "アジ鯖公式サイト",
      htmlAttrs: { lang: "ja" },
      meta: [
        {
          name: "description",
          content:
            "アジ鯖、たのしい。｜Minecraftマルチプレイサーバー アジ鯖の公式ホームページです。",
        },
      ],
      link: [{ rel: "icon", href: "/favicon.ico" }],
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
  i18n: {
    defaultLocale: "ja",
    locales: [
      {
        code: "ja",
        name: "Japanese",
        file: "ja.json",
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vueuse/core",
        "clsx",
        "reka-ui",
        "tailwind-merge",
        "@lucide/vue",
        "class-variance-authority",
      ],
      exclude: [
        "remark-gfm",
        "remark-emoji",
        "remark-mdc",
        "remark-rehype",
        "rehype-raw",
        "parse5",
        "unist-util-visit",
        "unified",
        "debug",
        "extend",
      ],
    },
  },
  mdc: {
    remarkPlugins: {
      "remark-breaks": {},
    },
  },
  routeRules: {
    "/terms": { redirect: "/rules/terms" },
    "/minecraft-server-policy": { redirect: "/rules/minecraft-server-policy" },
    "/minecraft-all-srv-rule": { redirect: "/rules/global-server-rules" },
    "/minecraft-srvs-rule": { redirect: "/rules/server-rules" },
    "/discord-rule": { redirect: "/rules/discord" },
    "/operating-terms-and-conditions": { redirect: "/rules/operating-terms-and-conditions" },
    "/fanfic-guidelines": { redirect: "/rules/derivative-works-guidelines" },
    "/chat-guideline": { redirect: "/rules/chat-guidelines" },
    "/help/rule-faq": { redirect: "/rules/faq" },
    "/notes-on-donations": { redirect: "/donation/note" },
    "/usage-of-donations": { redirect: "/donation/usage" },
    "/act-of-specified-commercial-transactions": { redirect: "/donation/commercial-transactions" },
    "/serverlist": { redirect: "/server" },
    "/server-intro/life": { redirect: "/servers/life" },
    "/server-intro/leon-gun-war-2": { redirect: "/servers/leon-gun-war-2" },
    "/server-intro/leon-gun-war": { redirect: "/servers/leon-gun-war" },
    "/server-intro/conflict": { redirect: "/servers/conflict" },
    "/server-intro/diverpg": { redirect: "/servers/diverpg" },
    "/server-intro/coretol": { redirect: "https://coretol.net/" },
    "/server-intro/junk-games": { redirect: "/servers/junk-games" },
    "/server-intro/a-fall-new-world": { redirect: "/servers/a-fall-new-world" },
    "/server-intro/vanilife2": { redirect: "/servers/vanilife2" },
    "/server-intro/vanilife": { redirect: "/servers/vanilife" },
    "/server-intro/despawn": { redirect: "/servers/despawn" },
    "/server-intro/the-slow-life": { redirect: "/servers/the-slow-life" },
    "/server-intro/phantasy-gate": { redirect: "/servers/phantasy-gate" },
    "/join": { redirect: "/play" },
    "/connect": { redirect: "/play" },
    "/connect/addresses": { redirect: "/addresses" },
    "/news": { redirect: "/blog" },
    "/news/20251217-1": { redirect: "/blog/20251217-1" },
    "/news/20250705-1": { redirect: "/blog/20250705-1" },
    "/devlog/20250705-1": { redirect: "/blog/20250705-2" },
    "/devlog/20250705-2": { redirect: "/blog/20250705-3" },
    "/devlog/20250705-3": { redirect: "/blog/20250705-4" },
    "/recruit/**": { redirect: "/recruits/**" },
    "/recruit/help-selection": { redirect: "/recruits/about" },
    "/recruit/help-after-acceptance": { redirect: "/recruits/about" },
    "/recruit/help-about-staff-team": { redirect: "/recruits/about" },
  },
  ssr: true,
});
