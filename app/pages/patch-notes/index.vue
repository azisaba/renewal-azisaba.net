<script lang="ts" setup>
import {
  PatchNoteCategory,
  type PatchNoteCategory as PatchNoteCategoryType,
  PatchNoteTarget,
  type PatchNoteTarget as PatchNoteTargetType,
} from "@azisaba/graph";

const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.patchNotes.name"));
const description = seo.description(t("pages.patchNotes.description"));

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogSiteName: seo.siteName,
  ogType: "website",
  ogUrl: seo.canonical,
  twitterCard: "summary",
  twitterTitle: title,
  twitterDescription: description,
});

useHead({
  link: [{ rel: "canonical", href: seo.canonical }],
});

const targetValues = Object.values(PatchNoteTarget);
const categoryValues = Object.values(PatchNoteCategory);
const filterOptions = [
  ...targetValues.map((value) => ({
    value,
    label: t(`common.patchNoteTarget.${value}`),
  })),
  ...categoryValues.map((value) => ({
    value,
    label: t(`common.patchNoteCategory.${value}`),
  })),
];
const filterGroups = [targetValues, categoryValues];

const selectedFilters = ref<string[]>([]);
const selectedTarget = computed(
  () =>
    selectedFilters.value.find((value) => targetValues.includes(value as PatchNoteTargetType)) as
      PatchNoteTargetType | undefined,
);
const selectedCategory = computed(
  () =>
    selectedFilters.value.find((value) =>
      categoryValues.includes(value as PatchNoteCategoryType),
    ) as PatchNoteCategoryType | undefined,
);

const shouldFetchOnServer = !import.meta.prerender;
</script>

<template>
  <Hero>
    <HeroContent>
      <template #title>
        {{ t("pages.patchNotes.title") }}
      </template>

      <p>{{ t("pages.patchNotes.description") }}</p>

      <TagPicker
        :exclusive-groups="filterGroups"
        :options="filterOptions"
        :placeholder="t('pages.patchNotes.filter')"
        v-model="selectedFilters"
      />
    </HeroContent>

    <HeroFloatingImage src="/images/heroes/patch-notes.png" />
  </Hero>

  <Section>
    <PatchNoteTable
      :category="selectedCategory"
      :target="selectedTarget"
      :server="shouldFetchOnServer"
    />
  </Section>
</template>

<style scoped></style>
