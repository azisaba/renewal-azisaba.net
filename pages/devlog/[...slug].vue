<template>
  <main class="markdown-element">
    <article v-if="data && data.published">
      <v-img
          v-if="data.image"
          :src="data.image"
          :cover="data.image_cover"
          max-height="600px"
          class="cover-image"
      ></v-img>
      <h1>{{ data.title }}</h1>
      <span class="subtitle">
        {{ data.author && ` by ${data.author}` }}
        {{ data.date && ` on ${data.date}` }}
      </span>
      <ContentRenderer :value="data" class="markdown-content"/>
    </article>
    <PageNotFound v-else message="page is not found."/>
  </main>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(`devlog-${route.path}`, () => {
  return queryCollection('devlog').path(route.path).first()
})
if (data.value) {
  const meta = [{ name: 'description', content: data.value.description }]
  meta.push({ property: 'og:title', content: data.value.title })
  meta.push({ property: 'og:site_name', content: 'アジ鯖開発ブログ' })
  meta.push({ property: 'og:description', content: data.value.description })
  meta.push({ property: 'og:type', content: 'website' })
  if (data.value.image) {
    meta.push({ property: 'og:image', content: data.value.image })
  }
  useHead({
    title: `${data.value.title} - アジ鯖開発ブログ`,
    meta,
  })
}
</script>

<style scoped>
.subtitle {
  font-size: 1rem;
  color: #999;
}

.cover-image {
  margin-bottom: 1rem;
}
</style>
