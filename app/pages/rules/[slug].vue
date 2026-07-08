<script lang="ts" setup>
const { t, d } = useI18n();

const route = useRoute();
const slug = route.params.slug as string;

const { data: page } = await useAsyncData(`rule-${route.path}`, () =>
  queryCollection("rule").path(`/rules/${slug}`).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const seo = useAzisabaSeo();
const title = seo.title(computed(() => page.value?.title));
const description = seo.description(
  computed(() =>
    page.value
      ? `${page.value.title}のページです。最終更新日は${d(new Date(page.value.lastUpdated))}です。`
      : undefined,
  ),
);
const image = seo.image("/images/heroes/rules.png");
const modifiedTime = seo.date(computed(() => page.value?.lastUpdated));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogSiteName: seo.siteName,
  ogType: "article",
  ogUrl: seo.canonical,
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  articleModifiedTime: modifiedTime,
});

useHead({
  link: [{ rel: "canonical", href: seo.canonical }],
});
</script>

<template>
  <Hero height="compact" v-if="page">
    <HeroContent>
      <template #title>
        {{ page.title }}
      </template>
      <p class="text-xl text-slate-300">
        {{ t("pages.rules.slug.lastUpdated", { date: d(new Date(page.lastUpdated)) }) }}
      </p>
    </HeroContent>
  </Hero>

  <Section>
    <ContentRenderer class="markdown" :value="page" v-if="page" />
  </Section>
</template>

<style scoped></style>
