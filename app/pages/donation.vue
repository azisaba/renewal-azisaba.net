<script lang="ts" setup>
import HeroLink from "~/components/HeroLink.vue";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";

const { t } = useI18n();

const seo = useAzisabaSeo();
const title = seo.title(t("pages.donation.name"));
const description = seo.description(t("pages.donation.description"));
const image = seo.image("/images/heroes/donation.webp");

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

const { data: doners } = await useFetch("/api/doners", {
  default: () => [],
});
</script>

<template>
  <Hero>
    <HeroContent>
      <template #title>
        {{ t("pages.donation.title") }}
      </template>

      <p class="whitespace-pre-line">{{ t("pages.donation.description") }}</p>

      <NuxtLink class="w-fit" rel="noopener noreferrer" to="https://azisaba.buycraft.net/">
        <Button class="cursor-pointer" variant="secondary">
          {{ t("pages.donation.links.tebex") }}
        </Button>
      </NuxtLink>
      <HeroLink to="/donation/note">
        {{ t("pages.donation.links.note") }}
      </HeroLink>
      <HeroLink to="/donation/commercial-transactions">
        {{ t("pages.donation.links.commercialTransactions") }}
      </HeroLink>
    </HeroContent>
    <HeroFloatingImage src="/images/heroes/donation.webp" />
  </Hero>

  <Section>
    <SectionTitle>{{ t("pages.donation.sections.doners") }}</SectionTitle>
    <div
      class="mt-10 grid grid-cols-2 justify-items-center gap-y-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6"
    >
      <TooltipProvider :key="doner.uuid" v-for="doner in doners">
        <Tooltip>
          <TooltipTrigger as-child>
            <NuxtImg
              class="size-24 rounded-2xl [image-rendering:pixelated]"
              :alt="`${doner.name}'s avatar`"
              :src="`https://api.mineatar.io/face/${doner.uuid}`"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p class="font-mono text-sm font-bold">{{ doner.name }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </Section>
</template>

<style scoped></style>
