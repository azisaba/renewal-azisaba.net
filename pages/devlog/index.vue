<template>
  <div class="article-container">
    <ArticleCard v-for="article in data"
      :key="article.path"
      :path="article.path"
      :title="article.title"
      :description="article.description"
      :image="article.image"
      :image_cover="article.image_cover"
    >
      <template #meta>
        {{ article.author && ` by ${article.author}` }}
        {{ article.date && ` on ${dayjs(article.date).format("YYYY-MM-DD")}` }}
      </template>
    </ArticleCard>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ar } from 'vuetify/locale';
dayjs().format()

const { data: rawData } = await useAsyncData('devlog', () =>
  queryCollection('devlog').all(),
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
