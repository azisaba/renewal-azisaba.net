<script lang="ts" setup>
import ServerListItem from "~/components/ServerListItem.vue";

const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.servers.name"));
const description = seo.description(t("pages.servers.description"));
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

const { data: availableServers } = await useAsyncData(
  "availableServers",
  () => queryCollection("server").where("status", "=", "available").all(),
  {
    default: () => [],
  },
);

const { data: inDevelopmentServers } = await useAsyncData(
  "inDevelopmentServers",
  () => queryCollection("server").where("status", "=", "inDevelopment").all(),
  {
    default: () => [],
  },
);

const { data: closedServers } = await useAsyncData(
  "closedServers",
  () => queryCollection("server").where("status", "=", "closed").all(),
  {
    default: () => [],
  },
);
</script>

<template>
  <Hero>
    <HeroContent>
      <template #title>
        {{ t("pages.servers.title") }}
      </template>
      <p>{{ t("pages.servers.description") }}</p>
    </HeroContent>
    <HeroFloatingImage src="/images/heroes/servers.webp" />
  </Hero>

  <Section v-if="availableServers.length > 0">
    <SectionTitle>{{ t("pages.servers.sections.available") }}</SectionTitle>

    <div class="flex flex-col gap-4 py-4">
      <ServerListItem :key="server.path" :value="server" v-for="server in availableServers" />
    </div>
  </Section>

  <Section v-if="inDevelopmentServers.length > 0">
    <SectionTitle>{{ t("pages.servers.sections.inDevelopment") }}</SectionTitle>

    <div class="flex flex-col gap-4 py-4">
      <ServerListItem :key="server.path" :value="server" v-for="server in inDevelopmentServers" />
    </div>
  </Section>

  <Section v-if="closedServers.length > 0">
    <SectionTitle>{{ t("pages.servers.sections.closed") }}</SectionTitle>

    <div class="flex flex-col gap-4 py-4">
      <ServerListItem :key="server.path" :value="server" v-for="server in closedServers" />
    </div>
  </Section>
</template>

<style scoped></style>
