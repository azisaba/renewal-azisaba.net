<template>
  <v-card class="article-card" height="400px" width="400px">
    <NuxtLink :to="path">
      <v-img :cover="image_cover" :src="image" height="200px" v-if="image" />
      <v-img height="200px" src="https://i.azisaba.net/no-image.webp" v-else />
    </NuxtLink>

    <v-card-title>
      <NuxtLink class="title" :to="path">
        <slot name="title" />
      </NuxtLink>
    </v-card-title>

    <v-card-text class="description">
      <slot name="description" />
    </v-card-text>

    <v-card-actions class="card-actions">
      <v-btn :to="path" text> 詳細を読む </v-btn>
      <span class="meta-data">
        <slot name="meta" />
      </span>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
defineProps<{
  path: string;
  image: string | null;
  image_cover: boolean | undefined;
}>();
</script>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  margin: 15px;
  box-shadow: 0 0 6px #b4b3b3;
  background-color: #fefefe;
}

.title {
  color: inherit;
  text-decoration: none;
}

.description {
  overflow: hidden;
}

.card-actions {
  display: flex;
  justify-content: space-between;
}

.meta-data {
  position: relative;
  top: 2px;
  color: gray;
  font-size: 0.8em;
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
