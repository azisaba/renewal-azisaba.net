<script lang="ts" setup>
const { t, d } = useI18n();

const route = useRoute();
const slug = route.params.slug as string;

const { data: patchNote, error: patchNoteError } = await useAsyncData(
  `patch-note-${slug}`,
  () => $fetch(`/api/patch-notes/${slug}`),
  {
    default: () => null,
  },
);

if (patchNoteError.value) {
  throw patchNoteError.value;
}

if (!patchNote.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
  });
}

const { data: author } = await useAsyncData(
  `patch-note-author-${patchNote.value.authorId ?? "none"}`,
  () =>
    patchNote.value?.authorId
      ? $fetch(`/api/players/${patchNote.value.authorId}`)
      : Promise.resolve(null),
  {
    default: () => null,
  },
);

const seo = useAzisabaSeo();
const title = seo.title(computed(() => patchNote.value?.title ?? t("pages.patchNotes.name")));
const description = seo.description(
  computed(() => patchNote.value?.body?.slice(0, 160) ?? t("pages.patchNotes.description")),
);
const image = seo.image(computed(() => patchNote.value?.imageUrls[0] ?? "/images/toppage.png"));
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
  <Hero height="compact">
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

  <Section>
    <article>
      <p class="mb-4 flex items-center gap-2 font-mono text-2xl" v-if="author">
        <NuxtImg
          class="size-8 [image-rendering:pixelated]"
          :alt="`${author.username}'s avatar`"
          :src="`https://api.mineatar.io/face/${author.id}`"
        />
        {{ author.username }}
      </p>

      <p class="text-base leading-8 whitespace-pre-wrap text-slate-700">{{ patchNote.body }}</p>

      <PatchNoteImageGallery :image-urls="patchNote.imageUrls" :title="patchNote.title" />
    </article>
  </Section>
</template>

<style scoped></style>
