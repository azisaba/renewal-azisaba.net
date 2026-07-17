<script lang="ts" setup>
const { t, d } = useI18n();

const route = useRoute();
const slug = route.params.slug as string;

const { data: page } = await useAsyncData(`article-${slug}`, () =>
  queryCollection("article").path(`/articles/${slug}`).where("published", "=", true).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const seo = useAzisabaSeo();
const title = seo.title(computed(() => page.value?.title));
const description = seo.description(computed(() => page.value?.summary));
const image = seo.image(computed(() => page.value?.thumbnail));
const date = seo.date(computed(() => page.value?.date));

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
  articlePublishedTime: date,
  articleModifiedTime: date,
});

useHead({
  link: [{ rel: "canonical", href: seo.canonical }],
});
</script>

<template>
  <Hero :background-src="page.thumbnail" height="compact" v-if="page">
    <HeroContent>
      <template #title>
        {{ page.title }}
      </template>

      <p class="font-mono text-lg text-shadow-slate-400">{{ d(page.date) }}</p>

      <div class="flex flex-wrap items-center gap-4">
        <BackToIndexButton to="/blog">{{ t("pages.blog.detail.backToIndex") }}</BackToIndexButton>
        <TweetButton />
      </div>
    </HeroContent>
  </Hero>

  <Section>
    <ContentRenderer class="markdown mt-5" :value="page" v-if="page" />
  </Section>
</template>

<style scoped></style>
