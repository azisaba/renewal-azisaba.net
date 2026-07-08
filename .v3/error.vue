<template>
  <NuxtLayout>
    <PageNotFound class="pageNotFound" :message="error?.message" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const error = useError();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | アジ鯖公式サイト` : "アジ鯖公式サイト";
  },
});
</script>

<style scoped>
.pageNotFound {
  padding-top: 11vh;
}
</style>
