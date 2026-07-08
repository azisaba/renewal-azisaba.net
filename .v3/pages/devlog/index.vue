<template>
  <div class="article-container">
    <DevlogArticleCard
      :author="article.author"
      :date="article.date"
      :description="article.description"
      :image="article.image"
      :image_cover="article.image_cover"
      :key="article.path"
      :path="article.path"
      :title="article.title"
      v-for="article in data"
    />
  </div>
</template>

<script lang="ts" setup>
import DevlogArticleCard from "~/components/ArticleCard/DevlogArticleCard.vue";
const { data: rawData } = await useAsyncData("devlog", () => queryCollection("devlog").all());
const data = rawData.value
  ?.filter((e) => e.published)
  ?.toSorted((a, b) => b.path.localeCompare(a.path));
</script>

<style scoped>
.article-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 85%;
}
</style>
