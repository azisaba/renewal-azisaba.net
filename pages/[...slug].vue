<template>
  <main class="markdown-element">
    <article v-if="data">
      <h1>{{ data.title }}</h1>
      <ContentRenderer :value="data" class="markdown-content"/>
    </article>
    <PageNotFound v-else message="page is not found."/>
  </main>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(`content-${route.path}`, () => {
  return queryCollection('content').path(route.path).first()
})
if (data.value) {
  useHead({title: `${data.value.title} - アジ鯖公式サイト`})
}
</script>

<style scoped>
</style>

<style>
html {
  overflow-y: auto;
}
</style>
