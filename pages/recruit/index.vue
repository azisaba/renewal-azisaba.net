<template>
  <div v-if="data?.length" class="article-container">
    <v-card
        v-for="article in data"
        :key="article.path"
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
          {{ article.server && ` ${article.server}` }}
        </span>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else class="no-recruit">
    <div v-if="tags.length > 0">
      <p>フィルターに一致する求人が見つかりませんでした。</p>
      <p><NuxtLink to="/recruit">フィルターを外して再検索</NuxtLink></p>
    </div>
    <p v-else>現在募集中の求人はありません。</p>
  </div>
</template>

<script lang="ts" setup>
const { data: rawData } = await useAsyncData('recruit', () =>
    queryCollection('recruit').all(),
)
const data = ref(rawData.value)
const tags = ref<string[]>([])
onMounted(() => {
  const query = new URLSearchParams(location?.hash?.slice(1))
  let tagsFilter = String(query.get("tags") || "").split(',') || []
  if (tagsFilter[0] === '') tagsFilter = []
  let localData = rawData.value?.filter(e => e.published)?.toSorted((a, b) => b.path.localeCompare(a.path)) || null
  if (tagsFilter.length > 0) {
    localData = localData?.filter(article => article.tags?.some(tag => tagsFilter.includes(tag))) || null
  }
  tags.value = tagsFilter
  data.value = localData
})
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
.no-recruit {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}
</style>
