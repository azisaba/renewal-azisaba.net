<script lang="ts" setup>
import { ArrowLeft } from "@lucide/vue";

defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink class="group w-fit" :to="to">
    <button
      type="button"
      class="flex cursor-pointer items-center gap-2 border border-white px-4 py-2"
    >
      <ArrowLeft class="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
      <slot />
    </button>
  </NuxtLink>
</template>

<style scoped></style>
