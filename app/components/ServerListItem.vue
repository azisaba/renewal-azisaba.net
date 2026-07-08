<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

type Server = Collections["server"];

defineProps<{
  value: Server;
}>();
</script>

<template>
  <NuxtLink
    class="group flex items-center gap-5 border border-slate-200 p-4"
    :to="`/servers/${value.path.split('/').pop()}`"
  >
    <NuxtImg
      class="size-16 object-cover"
      :alt="`${value.title}'s icon`"
      :src="value.iconSrc"
      v-if="value.iconSrc"
    />

    <div class="min-w-0 flex-1">
      <h2 class="font-display text-2xl font-bold transition group-hover:text-blue-400">
        {{ value.title }}
      </h2>

      <p class="mt-1 text-slate-500">
        {{ value.summary }}
      </p>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
