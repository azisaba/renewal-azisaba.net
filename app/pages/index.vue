<script lang="ts" setup>
const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.home.name"));
const description = seo.description(
  "Minecraftマルチプレイサーバー アジ鯖の公式ホームページです。サーバー情報、お知らせ、ルール、採用情報を掲載しています。",
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
</script>

<template>
  <div class="relative">
    <NuxtImg
      alt="Top image"
      class="aspect-video w-full object-cover"
      format="webp"
      height="1080"
      quality="80"
      sizes="100vw lg:1280px"
      src="/images/toppage.png"
      width="1920"
    />
    <div class="absolute inset-0 bg-black/10" />

    <div class="absolute inset-0 flex items-center justify-center px-4 text-center sm:px-6">
      <div
        class="relative z-10 flex w-full max-w-xl flex-col items-center justify-center gap-4 px-4 py-6 sm:px-8"
      >
        <h1
          class="hero-title font-decorative text-4xl font-bold wrap-break-word text-white sm:text-5xl"
        >
          {{ t("pages.home.title") }}
        </h1>

        <NuxtLink class="w-fit" to="/play">
          <Button class="bg-azisaba hover:bg-azisaba cursor-pointer px-8 py-6 text-2xl">
            {{ t("pages.home.playNow") }}
          </Button>
        </NuxtLink>

        <div class="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          <NuxtLink rel="noopener noreferrer" to="https://www.youtube.com/AzisabaNetwork">
            <i class="bi bi-youtube text-5xl text-[#ff0033]" />
          </NuxtLink>
          <NuxtLink rel="noopener noreferrer" to="https://x.com/AzisabaNetwork">
            <i class="bi bi-twitter text-5xl text-[#1da1f2]" />
          </NuxtLink>
          <NuxtLink rel="noopener noreferrer" to="https://discord.gg/azisaba">
            <i class="bi bi-discord text-5xl text-[#7289da]" />
          </NuxtLink>
          <NuxtLink rel="noopener noreferrer" to="https://github.com/AzisabaNetwork">
            <i class="bi bi-github text-5xl text-white" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <Section>
    <SectionTitle>最近のお知らせ</SectionTitle>
    <Feed />
  </Section>
</template>

<style scoped>
.hero-title {
  animation: slide-in-up 700ms ease-out both;
}

@keyframes slide-in-up {
  from {
    transform: translateY(32px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
