<script lang="ts" setup>
import { Bug, MessageCircleQuestion, ShieldAlert } from "@lucide/vue";

const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.support.name"));
const description = seo.description(t("pages.support.description"));
const image = seo.image("/images/heroes/support.png");

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

const { data: faqs } = await useAsyncData(
  "support-faqs",
  () => queryCollection("faq").where("category", "=", "support").all(),
  {
    default: () => [],
  },
);
</script>

<template>
  <Hero>
    <HeroContent>
      <template #title>
        {{ t("pages.support.title") }}
      </template>
      <p>{{ t("pages.support.description") }}</p>
    </HeroContent>
    <HeroFloatingImage src="/images/heroes/support.png" />
  </Hero>

  <Section>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
      <SupportCard :icon="Bug" :title="t('pages.support.suggestions.bugReport.title')">
        <p>{{ t("pages.support.suggestions.bugReport.description") }}</p>

        <ul>
          <li>
            <NuxtLink to="https://discord.gg/azisaba">{{
              t("pages.support.links.officialDiscord")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://forms.gle/vfsJDxSU5QPKhooh9">{{
              t("pages.support.links.bugReportForm")
            }}</NuxtLink>
          </li>
        </ul>
      </SupportCard>

      <SupportCard
        :icon="ShieldAlert"
        :title="t('pages.support.suggestions.punishmentAppeal.title')"
      >
        <p>{{ t("pages.support.suggestions.punishmentAppeal.description") }}</p>

        <ul>
          <li>
            <NuxtLink to="https://discord.gg/azisaba">{{
              t("pages.support.links.officialDiscord")
            }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://forms.gle/Y1K8eSfHYYzBL2LSA">{{
              t("pages.support.links.punishmentAppealForm")
            }}</NuxtLink>
          </li>
        </ul>
      </SupportCard>

      <SupportCard
        :icon="MessageCircleQuestion"
        :title="t('pages.support.suggestions.contact.title')"
      >
        <p>{{ t("pages.support.suggestions.contact.description") }}</p>

        <ul>
          <li>
            <NuxtLink to="https://discord.gg/azisaba">{{
              t("pages.support.links.officialDiscord")
            }}</NuxtLink>
          </li>
        </ul>
      </SupportCard>
    </div>
  </Section>

  <Section>
    <SectionTitle>{{ t("pages.support.sections.faq") }}</SectionTitle>

    <div class="flex flex-col gap-4 py-4 pt-5">
      <Faq :key="faq.id" :value="faq" v-for="faq in faqs" />
    </div>
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
