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
      <v-card-subtitle v-if="article.date">{{ article.date }}</v-card-subtitle>
      <v-card-text>{{ article.description }}</v-card-text>
      <v-card-actions>
        <v-btn
          text
          :to="article.path"
        >
          詳細を読む
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData('devlog', () =>
  queryCollection('devlog').all(),
)
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
