<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

type News = Collections["article"];

defineProps<{
  value: News;
}>();

const { d } = useI18n();
</script>

<template>
  <NuxtLink class="group block min-w-0" :to="`/blog/${value.path.split('/').pop()}`">
    <article class="flex min-w-0 flex-col gap-3 px-2 py-4 sm:flex-row sm:items-center">
      <div class="relative aspect-video w-full shrink-0 overflow-hidden sm:w-72">
        <NuxtImg
          class="h-full w-full object-cover object-center"
          :alt="value.title"
          :src="value.thumbnail"
        />

        <div
          class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/35"
        />
      </div>

      <div class="min-w-0 px-1 py-2 sm:px-4">
        <p class="text-azisaba font-mono text-xl">
          {{ d(new Date(value.date)) }}
        </p>

        <h2 class="font-display text-2xl font-bold wrap-break-word">
          {{ value.title }}
        </h2>

        <p class="mt-2 wrap-break-word text-slate-500">
          {{ value.summary }}
        </p>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped></style>
