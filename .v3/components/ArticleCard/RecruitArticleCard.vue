<template>
  <ArticleCard :image="image" :image_cover="image_cover" :path="path">
    <template #title>
      {{ title }}
    </template>
    <template #description>
      {{ description }}
    </template>
    <template #meta>
      <slot name="tags" />
    </template>
  </ArticleCard>
</template>

<script lang="ts" setup>
defineProps<{
  path: string;
  title: string;
  description: string | null;
  image: string | null;
  image_cover: boolean | undefined;
}>();
</script>

<style scoped></style>
