<template>
  <v-card width="400px" height="400px" class="article-card">
    <NuxtLink :to="path">
      <v-img v-if="image" :src="image" :cover="image_cover" height="200px" />
      <v-img v-else src="https://i.azisaba.net/no-image.webp" height="200px" />
    </NuxtLink>

    <v-card-title>
      <NuxtLink class="title" :to="path">
        <slot name="title"></slot>
      </NuxtLink>
    </v-card-title>

    <v-card-text class="description">
      <slot name="description"></slot>
    </v-card-text>

    <v-card-actions class="card-actions">
      <v-btn text :to="path">
        詳細を読む
      </v-btn>
      <span class="meta-data">
        <slot name="meta" />
      </span>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  path: string,
  image: string | null,
  image_cover: boolean | undefined,
}>()
</script>

<style scoped>
.article-card {
  margin: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 6px #b4b3b3;
  background-color: #fefefe;
}

.title {
  text-decoration: none;
  color: inherit;
}

.description {
  overflow: hidden;
}

.card-actions {
  display: flex;
  justify-content: space-between;
}

.meta-data {
  font-size: 0.8em;
  color: gray;
  top: 2px;
  position: relative;
}

.dark-mode .article-card {
  box-shadow: 0 0 3px #b4b3b3;
  background-color: #464646;
}

.dark-mode .meta-data,
.article-card {
  color: inherit;
}
</style>
