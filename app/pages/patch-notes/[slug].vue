<script lang="ts" setup>
const { t, d } = useI18n();

const route = useRoute();
const slug = route.params.slug as string;

const { data: patchNote } = await useFetch(`/api/patch-notes/${slug}`);

if (!patchNote.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const seo = useAzisabaSeo();
const title = seo.title(computed(() => patchNote.value?.title));
const description = seo.description(computed(() => patchNote.value?.body.slice(0, 160)));
const image = seo.image(computed(() => patchNote.value?.imageUrls[0]));
const date = seo.date(computed(() => patchNote.value?.createdAt));

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
  <Hero height="compact" v-if="patchNote">
    <HeroContent>
      <template #title>
        {{ patchNote.title }}
      </template>

      <time
        class="font-mono text-lg text-shadow-slate-400"
        :datetime="new Date(patchNote.createdAt).toISOString()"
      >
        {{ d(new Date(patchNote.createdAt)) }}
      </time>

      <div class="flex flex-wrap items-center gap-2">
        <PatchNoteTargetBadge :value="patchNote.target" />
        <PatchNoteCategoryBadge :value="patchNote.category" />
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <BackToIndexButton to="/patch-notes">
          {{ t("pages.patchNotes.detail.backToIndex") }}
        </BackToIndexButton>
        <TweetButton />
      </div>
    </HeroContent>
  </Hero>

  <Section v-if="patchNote">
    <article>
      <p class="text-base leading-8 whitespace-pre-wrap text-slate-700">{{ patchNote.body }}</p>

      <PatchNoteImageGallery :image-urls="patchNote.imageUrls" :title="patchNote.title" />
    </article>
  </Section>
</template>

<style scoped></style>
