<script lang="ts" setup>
const { t } = useI18n();

const url = useRequestURL();

const tweetUrl = computed(
  () => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url.href)}`,
);
</script>

<template>
  <NuxtLink class="w-fit" :to="tweetUrl" rel="noopener noreferrer" target="_blank">
    <button
      type="button"
      class="cursor-pointer border border-white bg-[#1da1f2] px-4 py-2 text-white"
    >
      {{ t("components.tweetButton") }}
    </button>
  </NuxtLink>
</template>

<style scoped></style>
