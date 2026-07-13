<script lang="ts" setup>
const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.recruits.about.name"));
const description = seo.description(t("pages.recruits.about.description"));
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

const { data: faqs } = await useAsyncData("recruit-faqs", () =>
  queryCollection("faq").where("category", "=", "recruitment").all(),
);
</script>

<template>
  <Hero height="compact">
    <HeroContent>
      <template #title>
        {{ t("pages.recruits.about.title") }}
      </template>

      <p>{{ t("pages.recruits.about.description") }}</p>

      <BackToIndexButton to="/recruits">
        {{ t("pages.recruits.about.backToIndex") }}
      </BackToIndexButton>
    </HeroContent>
  </Hero>

  <Section>
    <div class="flex flex-col gap-4">
      <Faq :value="faq" v-for="faq in faqs" />
    </div>
  </Section>
</template>

<style scoped></style>
