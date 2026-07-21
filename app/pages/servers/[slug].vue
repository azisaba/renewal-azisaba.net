<script lang="ts" setup>
import { Info, Play } from "@lucide/vue";

const { t } = useI18n();

const route = useRoute();
const slug = route.params.slug as string;

const { data: page } = await useAsyncData(`server-${route.path}`, () =>
  queryCollection("server").path(`/servers/${slug}`).first(),
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
const image = seo.image("/images/heroes/servers.webp");

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
      <template #title>
        {{ page.title }}
      </template>
      <div class="flex items-center gap-2">
        <Badge
          :class="
            page.status === 'closed'
              ? 'bg-red-500'
              : page.status === 'inDevelopment'
                ? 'bg-indigo-500'
                : 'bg-blue-500'
          "
        >
          <Info />
          {{ t(`pages.servers.detail.status.${page.status}`) }}
        </Badge>
        <Badge class="bg-green-600" v-if="page.supportedVersion">
          <Play />
          {{ page.supportedVersion[0] }} - {{ page.supportedVersion[1] }}
        </Badge>
      </div>
      <div class="flex items-center gap-4">
        <BackToIndexButton to="/servers">
          {{ t("pages.servers.detail.backToIndex") }}
        </BackToIndexButton>
        <TweetButton />
      </div>
    </HeroContent>
  </Hero>

  <Section>
    <ContentRenderer class="markdown mt-5" :value="page" v-if="page" />
  </Section>
</template>

<style scoped></style>
