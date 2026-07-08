<script lang="ts" setup>
const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.rules.name"));
const description = seo.description(t("pages.rules.description"));
const image = seo.image("/images/heroes/rules.png");

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

const { data: generalRules } = await useAsyncData(
  "generalRules",
  () => queryCollection("rule").where("category", "=", "general").all(),
  { default: () => [] },
);
const { data: minecraftRules } = await useAsyncData(
  "minecraftRules",
  () => queryCollection("rule").where("category", "=", "minecraft").all(),
  { default: () => [] },
);
const { data: discordRules } = await useAsyncData(
  "discordRules",
  () => queryCollection("rule").where("category", "=", "discord").all(),
  { default: () => [] },
);
const { data: guidelineRules } = await useAsyncData(
  "guidelineRules",
  () => queryCollection("rule").where("category", "=", "guideline").all(),
  { default: () => [] },
);
const { data: otherRules } = await useAsyncData(
  "otherRules",
  () => queryCollection("rule").where("category", "=", "other").all(),
  { default: () => [] },
);
</script>

<template>
  <Hero>
    <HeroContent>
      <template #title>
        {{ t("pages.rules.title") }}
      </template>
      <p>{{ t("pages.rules.description") }}</p>
    </HeroContent>
    <HeroFloatingImage src="/images/heroes/rules.png" />
  </Hero>

  <Section>
    <SectionTitle>{{ t("pages.rules.sections.general") }}</SectionTitle>
    <ul>
      <li :key="rule.path" v-for="rule in generalRules">
        <NuxtLink :to="`/rules/${rule.path.split('/').pop()}`">{{ rule.title }}</NuxtLink>
      </li>
    </ul>
  </Section>

  <Section>
    <SectionTitle>{{ t("pages.rules.sections.minecraft") }}</SectionTitle>
    <ul>
      <li :key="rule.path" v-for="rule in minecraftRules">
        <NuxtLink :to="`/rules/${rule.path.split('/').pop()}`">{{ rule.title }}</NuxtLink>
      </li>
    </ul>
  </Section>

  <Section>
    <SectionTitle>{{ t("pages.rules.sections.discord") }}</SectionTitle>
    <ul>
      <li :key="rule.path" v-for="rule in discordRules">
        <NuxtLink :to="`/rules/${rule.path.split('/').pop()}`">{{ rule.title }}</NuxtLink>
      </li>
    </ul>
  </Section>

  <Section>
    <SectionTitle>{{ t("pages.rules.sections.guideline") }}</SectionTitle>
    <ul>
      <li :key="rule.path" v-for="rule in guidelineRules">
        <NuxtLink :to="`/rules/${rule.path.split('/').pop()}`">{{ rule.title }}</NuxtLink>
      </li>
    </ul>
  </Section>

  <Section>
    <SectionTitle>{{ t("pages.rules.sections.other") }}</SectionTitle>
    <ul>
      <li :key="rule.path" v-for="rule in otherRules">
        <NuxtLink :to="`/rules/${rule.path.split('/').pop()}`">{{ rule.title }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/privacy-policy">{{ t("pages.rules.links.privacyPolicy") }}</NuxtLink>
      </li>
    </ul>
  </Section>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
  padding-left: 1.5rem;
  list-style: disc;
}

li > a {
  color: var(--color-blue-500);
}
</style>
