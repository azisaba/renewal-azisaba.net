<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

type News = Collections["article"];

defineProps<{
  value: News;
}>();

const { d } = useI18n();
</script>

<template>
  <NuxtLink class="group block" :to="`/blog/${value.path.split('/').pop()}`">
    <div class="flex items-center gap-2 px-2 py-4">
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

      <div class="px-4 py-2">
        <p class="text-azisaba font-mono text-xl">{{ d(new Date(value.date)) }}</p>
        <h2 class="font-display text-2xl font-bold">{{ value.title }}</h2>
        <p class="mt-2 text-slate-500">{{ value.summary }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
