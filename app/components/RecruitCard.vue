<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

type Recruit = Collections["recruit"];

defineProps<{
  value: Recruit;
}>();
</script>

<template>
  <NuxtLink
    class="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
    :to="`/recruits/${value.path.split('/').pop()}`"
  >
    <div class="relative overflow-hidden">
      <NuxtImg
        class="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
        :alt="value.title"
        :src="value.thumbnail"
      />

      <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <h2 class="font-display absolute right-4 bottom-4 left-4 text-3xl font-bold text-white">
        {{ value.title }}
      </h2>
    </div>

    <div class="flex flex-col gap-2 p-4">
      <div class="flex min-w-0 flex-wrap items-center gap-2">
        <Badge :key="tag" v-for="tag in value.tags">
          {{ tag }}
        </Badge>
      </div>

      <p class="text-sm text-slate-600">{{ value.summary }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
