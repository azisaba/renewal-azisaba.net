<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

type NewsItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  label: string;
  to: string;
};

const { d } = useI18n();

const getSlug = (path: string) => path.split("/").pop();

const toDateString = (date: Date | string) => new Date(date).toISOString();

const toTimestamp = (date: string) => new Date(date).getTime();

const toArticleItem = (article: Collections["article"]): NewsItem => ({
  id: `article:${article.id}`,
  date: toDateString(article.date),
  title: article.title,
  description: article.summary,
  label: "ブログ",
  to: `/blog/${getSlug(article.path)}`,
});

const toRuleItem = (rule: Collections["rule"]): NewsItem => ({
  id: `rule:${rule.id}`,
  date: toDateString(rule.lastUpdated),
  title: `${rule.title}を改正しました`,
  description: "ルールの内容が更新されました。",
  label: "ルール",
  to: `/rules/${getSlug(rule.path)}`,
});

const toRecruitItem = (recruit: Collections["recruit"]): NewsItem => ({
  id: `recruit:${recruit.id}`,
  date: toDateString(recruit.date),
  title: `${recruit.title}の求人を掲載しました`,
  description: recruit.summary,
  label: "求人",
  to: `/recruits/${getSlug(recruit.path)}`,
});

const { data: news } = await useAsyncData(
  "news",
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
      .sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date))
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
        <Badge class="sm:mt-2">{{ item.label }}</Badge>
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
