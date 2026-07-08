<script lang="ts" setup>
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "~/components/ui/stepper";

const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.recruits.name"));
const description = seo.description(t("pages.recruits.description"));
const image = seo.image("/images/heroes/recruit.png");

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

const { data: recruits } = await useAsyncData(
  "recruits",
  () => queryCollection("recruit").where("published", "=", true).all(),
  {
    default: () => [],
  },
);

const selectedTags = ref<string[]>([]);

const tagOptions = computed(() => [...new Set(recruits.value.flatMap((recruit) => recruit.tags))]);

const filteredRecruits = computed(() => {
  if (selectedTags.value.length === 0) {
    return recruits.value;
  }

  return recruits.value.filter((recruit) =>
    recruit.tags.some((tag) => selectedTags.value.includes(tag)),
  );
});
</script>

<template>
  <Hero :title="t('pages.recruits.title')" hero-image-src="/images/heroes/recruit.png">
    <HeroContent>
      <template #title>
        {{ t("pages.recruits.title") }}
      </template>

      <p class="whitespace-pre-line">{{ t("pages.recruits.description") }}</p>

      <Stepper>
        <StepperItem :step="1">
          <StepperTrigger>
            <StepperIndicator class="bg-muted">1</StepperIndicator>
            <StepperTitle>
              {{ t("pages.recruits.steps.agreeToOperatingTermsAndConditions.title") }}
            </StepperTitle>
            <StepperDescription class="text-slate-300">
              {{ t("pages.recruits.steps.agreeToOperatingTermsAndConditions.description") }}
            </StepperDescription>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem :step="2">
          <StepperTrigger>
            <StepperIndicator class="bg-muted">2</StepperIndicator>
            <StepperTitle>
              {{ t("pages.recruits.steps.selectRecruitmentToApply.title") }}
            </StepperTitle>
            <StepperDescription class="text-slate-300">
              {{ t("pages.recruits.steps.selectRecruitmentToApply.description") }}
            </StepperDescription>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>

        <StepperItem :step="3">
          <StepperTrigger>
            <StepperIndicator class="bg-muted">3</StepperIndicator>
            <StepperTitle>
              {{ t("pages.recruits.steps.submitGoogleForm.title") }}
            </StepperTitle>
            <StepperDescription class="text-slate-300">
              {{ t("pages.recruits.steps.submitGoogleForm.description") }}
            </StepperDescription>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
      </Stepper>

      <HeroLink to="/recruits/about">
        {{ t("pages.recruits.links.about") }}
      </HeroLink>
      <HeroLink to="/rules/operating-terms-and-conditions">
        {{ t("pages.recruits.links.operatingTermsAndConditions") }}
      </HeroLink>
      <HeroLink rel="noopener noreferrer" target="_blank" to="https://forms.gle/71PiZLnU5GC4b6FTA">
        {{ t("pages.recruits.links.googleForm") }}
      </HeroLink>
    </HeroContent>
    <HeroFloatingImage src="/images/heroes/recruit.png" />
  </Hero>

  <Section>
    <TagPicker
      :options="tagOptions"
      :placeholder="t('pages.recruits.filter')"
      v-model="selectedTags"
    />

    <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      <RecruitCard :key="recruit.id" :value="recruit" v-for="recruit in filteredRecruits" />
    </div>
  </Section>
</template>

<style scoped></style>
