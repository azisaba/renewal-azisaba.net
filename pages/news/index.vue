<template>
  <div class="article-container">
    <NewsArticleCard v-for="article in data"
      :key="article.path"
      :path="article.path"
      :title="article.title"
      :description="article.description"
      :date="article.date"
      :image="article.image"
      :image_cover="article.image_cover"
    />
  </div>
</template>

<script lang="ts" setup>
import NewsArticleCard from '~/components/ArticleCard/NewsArticleCard.vue';

const { data: rawData } = await useAsyncData('news', () =>
  queryCollection('news').all(),
)
const data = rawData.value?.filter(e => e.published)?.toSorted((a, b) => b.path.localeCompare(a.path))
</script>

<style scoped>
.article-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  justify-content: center;
}
</style>
