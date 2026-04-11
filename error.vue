<template>
  <NuxtLayout>
      <PageNotFound class="pageNotFound" :message=error?.message />
  </NuxtLayout>
</template>

<style scoped>
.pageNotFound {
  padding-top: 11vh;
}
</style>

<script setup lang="ts">

const error = useError();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | アジ鯖公式サイト` : 'アジ鯖公式サイト';
  }
})
</script>