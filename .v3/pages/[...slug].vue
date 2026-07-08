<template>
  <main class="markdown-element">
    <article v-if="data">
      <h1>{{ data.title }}</h1>
      <ContentRenderer class="markdown-content" :value="data" />
    </article>
  </main>
  <PageNotFound message="page is not found." v-if="!data" />
</template>

<script setup>
definePageMeta({
  layout: "markdown",
});

const route = useRoute();
const { data } = await useAsyncData(`content-${route.path}`, () => {
  return queryCollection("content").path(route.path).first();
});
if (data.value) {
  useHead({ title: `${data.value.title} - アジ鯖公式サイト` });
}
</script>

<style scoped></style>
