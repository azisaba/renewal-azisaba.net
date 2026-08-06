<script lang="ts" setup>
import ArticleList from "~/components/ArticleList.vue";

const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.blog.name"));
const description = seo.description(t("pages.blog.description"));
const image = seo.image("/images/heroes/news.webp");

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

const { data: articles } = await useAsyncData(
  "blog",
  () => queryCollection("article").where("published", "=", true).order("date", "DESC").all(),
  {
    default: () => [],
  },
);
</script>

<template>
  <Hero>
    <HeroContent>
      <template #title>
        {{ t("pages.blog.title") }}
      </template>
      <p>{{ t("pages.blog.description") }}</p>
    </HeroContent>
    <HeroFloatingImage src="/images/heroes/blog.webp" />
  </Hero>

  <Section>
    <ArticleList :articles="articles" :items-per-page="6" />
  </Section>
</template>

<style scoped></style>
