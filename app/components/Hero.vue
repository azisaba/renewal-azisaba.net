<script lang="ts" setup>
withDefaults(
  defineProps<{
    height?: "spacious" | "compact";
    backgroundSrc?: string;
  }>(),
  {
    height: "spacious",
  },
);
</script>

<template>
  <section class="bg-azisaba relative overflow-hidden text-white">
    <NuxtImg
      class="absolute inset-0 h-full w-full object-cover"
      :src="backgroundSrc"
      v-if="backgroundSrc"
    />
    <div class="absolute inset-0 bg-black/50" v-if="backgroundSrc" />

    <div
      class="mx-auto grid w-full max-w-5xl grid-cols-1 items-center px-6 md:px-8"
      :class="{
        'min-h-64 py-16 md:py-20': height === 'spacious',
        'min-h-16 py-4 md:py-10': height === 'compact',
      }"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped></style>
