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
      <span class="published-at" v-if="data.date">{{ data.date }}</span>
      <ContentRenderer :value="data" class="markdown-content"/>
    </article>
    <PageNotFound v-else message="page is not found."/>
  </main>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(`news-${route.path}`, () => {
  return queryCollection('news').path(route.path).first()
})
if (data.value) {
  const meta = [{ name: 'description', content: data.value.description }]
  meta.push({ property: 'og:title', content: data.value.title })
  meta.push({ property: 'og:site_name', content: 'アジ鯖ニュース' })
  meta.push({ property: 'og:description', content: data.value.description })
  meta.push({ property: 'og:type', content: 'website' })
  if (data.value.image) {
    meta.push({ property: 'og:image', content: data.value.image })
    meta.push({ property: 'twitter:card', content: 'summary_large_image' })
  }
  useHead({
    title: `${data.value.title} - アジ鯖ニュース`,
    meta,
  })
}
</script>

<style scoped>
.published-at {
  font-size: 1rem;
  color: #999;
}

.cover-image {
  margin-bottom: 1rem;
}
</style>
