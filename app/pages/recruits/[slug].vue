<script lang="ts" setup>
import CopyButton from "~/components/CopyButton.vue";

const { t } = useI18n();

const route = useRoute();
const slug = route.params.slug as string;

const { data: page } = await useAsyncData(`recruit-${route.path}`, () =>
  queryCollection("recruit").path(`/recruits/${slug}`).where("published", "=", true).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const seo = useAzisabaSeo();
const title = seo.title(
  computed(() => (page.value ? `${page.value.title} | 採用情報` : undefined)),
);
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

      <div class="flex flex-wrap gap-x-2 gap-y-1">
        <Badge class="bg-blue-500" :key="tag" v-for="tag in page.tags">
          {{ tag }}
        </Badge>
      </div>

      <div class="flex items-center gap-4">
        <BackToIndexButton to="/recruits">
          {{ t("pages.recruits.detail.backToIndex") }}
        </BackToIndexButton>
        <CopyButton :value="page.recruitId">
          {{ t("pages.recruits.detail.recruitId") }}
        </CopyButton>
      </div>
    </HeroContent>
  </Hero>

  <Section>
    <ContentRenderer class="markdown" :value="page" v-if="page" />
  </Section>
</template>

<style scoped></style>
