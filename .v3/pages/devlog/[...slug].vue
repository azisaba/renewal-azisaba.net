<template>
  <main class="markdown-element">
    <article v-if="data && data.published">
      <v-img
        class="cover-image"
        :cover="data.image_cover"
        :src="data.image"
        max-height="600px"
        v-if="data.image"
      />
      <h1>{{ data.title }}</h1>
      <span class="subtitle">
        {{ data.author && ` by ${data.author}` }}
        {{ data.date && ` on ${dayjs(data.date).format("YYYY-MM-DD")}` }}
      </span>
      <ContentRenderer class="markdown-content" :value="data" />
    </article>
    <PageNotFound message="page is not found." v-else />
  </main>
</template>

<script setup>
import dayjs from "dayjs";
dayjs().format();

const route = useRoute();
const { data } = await useAsyncData(`devlog-${route.path}`, () => {
  return queryCollection("devlog").path(route.path).first();
});
if (data.value) {
  const meta = [{ name: "description", content: data.value.description }];
  meta.push({ property: "og:title", content: data.value.title });
  meta.push({ property: "og:site_name", content: "アジ鯖開発ブログ" });
  meta.push({ property: "og:description", content: data.value.description });
  meta.push({ property: "og:type", content: "website" });
  if (data.value.image) {
    meta.push({ property: "og:image", content: data.value.image });
    meta.push({ property: "twitter:card", content: "summary_large_image" });
  }
  useHead({
    title: `${data.value.title} - アジ鯖開発ブログ`,
    meta,
  });
}
</script>

<style scoped>
.subtitle {
  color: #999;
  font-size: 1rem;
}

.cover-image {
  margin-bottom: 1rem;
}
</style>
