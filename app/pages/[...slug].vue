<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection("content").path(route.path).first(),
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
  computed(() => (page.value?.title ? `${page.value.title} | アジ鯖公式サイト` : undefined)),
);
const image = seo.image();

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
  <Hero height="compact" v-if="page">
    <HeroContent>
      <template #title>{{ page.title }}</template>
    </HeroContent>
  </Hero>

  <Section>
    <ContentRenderer class="markdown mt-5" :value="page" v-if="page" />
  </Section>
</template>

<style scoped></style>
