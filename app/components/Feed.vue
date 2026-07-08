<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

type FeedItem = {
  id: string;
  type: "blog" | "rule" | "recruit";
  title: string;
  description: string;
  date: string;
  to: string;
};

const { t, d } = useI18n();

const getSlug = (path: string) => path.split("/").pop();

const toDateString = (date: Date | string) => new Date(date).toISOString();

const toArticleItem = (article: Collections["article"]): FeedItem => ({
  id: `article:${article.id}`,
  type: "blog",
  title: article.title,
  description: article.summary,
  date: toDateString(article.date),
  to: `/blog/${getSlug(article.path)}`,
});

const toRuleItem = (rule: Collections["rule"]): FeedItem => ({
  id: `rule:${rule.id}`,
  type: "rule",
  title: t("components.feed.rule.title", { title: rule.title }),
  description: t("components.feed.rule.description"),
  date: toDateString(rule.lastUpdated),
  to: `/rules/${getSlug(rule.path)}`,
});

const toRecruitItem = (recruit: Collections["recruit"]): FeedItem => ({
  id: `recruit:${recruit.id}`,
  type: "recruit",
  title: t("components.feed.recruit.title", { title: recruit.title }),
  description: recruit.summary,
  date: toDateString(recruit.date),
  to: `/recruits/${getSlug(recruit.path)}`,
});

const { data: news } = await useAsyncData(
  "feed",
  async () => {
    const [articles, rules, recruits] = await Promise.all([
      queryCollection("article").where("published", "=", true).all(),
      queryCollection("rule").all(),
      queryCollection("recruit").where("published", "=", true).all(),
    ]);

    return [
      ...articles.map(toArticleItem),
      ...rules.map(toRuleItem),
      ...recruits.map(toRecruitItem),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  },
  {
    default: () => [],
  },
);
</script>

<template>
  <div class="divide-y divide-slate-200">
    <NuxtLink
      class="group grid gap-2 py-4 transition hover:bg-slate-50 sm:grid-cols-[7rem_1fr] sm:gap-4 sm:px-3"
      :key="item.id"
      :to="item.to"
      v-for="item in news"
    >
      <div class="flex items-center gap-2 sm:block">
        <time class="text-azisaba font-mono text-sm sm:text-base" :datetime="item.date">
          {{ d(new Date(item.date)) }}
        </time>
        <Badge class="sm:mt-2">{{ t(`components.feed.${item.type}.label`) }}</Badge>
      </div>

      <div class="min-w-0">
        <p class="font-display group-hover:text-azisaba text-xl font-bold transition">
          {{ item.title }}
        </p>
        <p class="mt-1 line-clamp-2 text-sm text-slate-600">
          {{ item.description }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped></style>
