<template>
  <div class="article-container">
    <v-card
        v-for="article in data"
        :key="article.path"
        :v-if="article.published"
        width="400px"
        height="400px"
        style="margin: 15px; display: flex; flex-direction: column; box-shadow: 0 0 4px #ccc;"
    >
      <NuxtLink :to="article.path">
        <v-img
            v-if="article.image"
            :src="article.image"
            :cover="article.image_cover"
            height="200px"
        />
        <v-img
            v-else
            src="https://i.azisaba.net/no-image.webp"
            height="200px"
        />
      </NuxtLink>
      <v-card-title>
        <NuxtLink style="text-decoration: none; color: inherit;" :to="article.path">
          {{ article.title }}
        </NuxtLink>
      </v-card-title>
      <v-card-text style="overflow: hidden">{{ article.description }}</v-card-text>
      <v-card-actions style="display: flex; justify-content: space-between;">
        <v-btn
          text
          :to="article.path"
        >
          詳細を読む
        </v-btn>
        <span style="font-size: 0.8em; color: gray; top: 2px; position: relative;">
          {{ article.author && ` by ${article.author}` }}
          {{ article.date && ` on ${article.date}` }}
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const { data: rawData } = await useAsyncData('devlog', () =>
  queryCollection('devlog').all(),
)
const data = rawData.value?.toSorted((a, b) => b.path.localeCompare(a.path))
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
