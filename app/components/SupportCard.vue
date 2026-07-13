<script lang="ts" setup>
defineProps<{
  title: string;
  icon: Component;
}>();
</script>

<template>
  <div class="rounded-xl bg-sky-200 p-6">
    <component aria-hidden="true" class="size-12" :is="icon" />

    <h2 class="font-display mt-4 text-xl font-bold text-slate-900">
      {{ title }}
    </h2>

    <div class="mt-2 leading-7 text-slate-600">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
