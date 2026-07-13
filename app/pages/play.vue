<script lang="ts" setup>
const { t } = useI18n({ useScope: "global" });

definePageMeta({
  layout: "play",
});

const seo = useAzisabaSeo();
const title = seo.title(t("pages.play.name"));
const description = seo.description(
  "アジ鯖への接続アドレスと、参加前に確認しておきたいルールを案内しています。",
);
const image = seo.image("/images/toppage.png");

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogSiteName: seo.siteName,
  ogType: "website",
  ogUrl: seo.canonical,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
});

useHead({
  link: [{ rel: "canonical", href: seo.canonical }],
});

const stars = ref<
  {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
  }[]
>([]);

onMounted(() => {
  stars.value = Array.from({ length: 180 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 70 + 30;

    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 3,
    };
  });
});
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-zinc-950 text-white">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,114,112,0.35),transparent_45%)]"
    />

    <div class="pointer-events-none absolute inset-0">
      <span
        class="star absolute top-1/2 left-1/2 rounded-full bg-white"
        :key="star.id"
        :style="{
          width: `${star.size}px`,
          height: `${star.size}px`,
          animationDelay: `${star.delay}s`,
          animationDuration: `${star.duration}s`,
          '--x': `${star.x}vw`,
          '--y': `${star.y}vh`,
        }"
        v-for="star in stars"
      />
    </div>

    <div class="relative flex min-h-screen items-center justify-center px-4 text-center">
      <div class="flex w-full max-w-lg flex-col items-center gap-12">
        <h1 class="text-center text-5xl sm:text-6xl">
          {{ t("pages.play.title") }}
        </h1>

        <AddressBox class="w-full max-w-86" value="mc.azisaba.net" />

        <i18n-t
          class="text-center whitespace-pre-line"
          keypath="pages.play.description"
          scope="global"
          tag="p"
        >
          <template #rules>
            <NuxtLinkLocale
              class="text-blue-500 transition-colors hover:text-blue-300"
              target="_blank"
              to="/rules"
            >
              {{ t("pages.play.links.rules") }}
            </NuxtLinkLocale>
          </template>

          <template #addresses>
            <NuxtLinkLocale
              class="text-blue-500 transition-colors hover:text-blue-300"
              target="_blank"
              to="/addresses"
            >
              {{ t("pages.play.links.addresses") }}
            </NuxtLinkLocale>
          </template>
        </i18n-t>
      </div>
    </div>
  </div>
</template>

<style scoped>
.star {
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-iteration-count: infinite;
  animation-name: warp;
  --x: 0;
  --y: 0;
}

@keyframes warp {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0);
    opacity: 0;
  }

  10% {
    opacity: 0.9;
  }

  100% {
    transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1.8);
    opacity: 0;
  }
}
</style>
