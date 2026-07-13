<script lang="ts" setup>
import { Link } from "@lucide/vue";

defineProps<{
  to: string;
}>();
</script>

<template>
  <NuxtLink class="flex w-fit items-center gap-2 text-base text-blue-300 underline" :to="to">
    <Link class="size-4" />
    <slot />
  </NuxtLink>
</template>

<style scoped></style>
