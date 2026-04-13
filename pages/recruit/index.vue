<template>
  <div class="filter-container">
    <v-select @update:model-value="arr => replaceTags(arr)" v-model="tags" :items="allTags" label="タグで絞り込む" multiple></v-select>
  </div>
  <div v-if="data?.length" class="article-container">
    <RecruitArticleCard v-for="article in data" 
      :key="article.path"
      :path="article.path"
      :title="article.title"
      :description="article.description"
      :image="article.image"
      :image_cover="article.image_cover"
    >
      <template #tags>
        <template v-if="article.tags">
          <NuxtLink v-for="tag in article.tags" :key="tag" :href="'?tags=' + tag" class="tag-link">
            #{{ tag }}
          </NuxtLink>
        </template>
      </template>
    </RecruitArticleCard>
  </div>
  <div v-else class="no-recruit">
    <div v-if="tags.length > 0">
      <p>フィルターに一致する求人が見つかりませんでした。</p>
      <p>
        <NuxtLink to="/recruit">フィルターを外して再検索</NuxtLink>
      </p>
    </div>
    <p v-else>現在募集中の求人はありません。</p>
  </div>
</template>

<script lang="ts" setup>
import RecruitArticleCard from '~/components/ArticleCard/RecruitArticleCard.vue'

const { data: rawData } = await useAsyncData('recruit', () =>
  queryCollection('recruit').all(),
)
const data = ref(rawData.value)
const allTags = (rawData.value?.filter(e => e.published)?.flatMap(e => e.tags || []) || []).filter((v, i, a) => a.indexOf(v) === i)
const tags = ref<string[]>([])
const queueRefresh = () => {
  setTimeout(() => {
    const query = new URLSearchParams(location?.search?.slice(1))
    let tagsFilter = String(query.get("tags") || "").split(',') || []
    if (tagsFilter[0] === '') tagsFilter = []
    let localData = rawData.value?.filter(e => e.published)?.toSorted((a, b) => b.path.localeCompare(a.path)) || null
    if (tagsFilter.length > 0) {
      localData = localData?.filter(article => article.tags?.some(tag => tagsFilter.includes(tag))) || null
    }
    tags.value = tagsFilter
    data.value = localData
  }, 10)
}
onMounted(queueRefresh)
onBeforeRouteUpdate(queueRefresh)

const replaceTags = (tags: string | readonly string[] | null) => {
  if (tags === null) {
    history.replaceState(null, '', '')
    queueRefresh()
  } else {
    const array = Array.isArray(tags) ? tags : [tags]
    history.replaceState(null, '', `?tags=${array.join(',')}`)
    queueRefresh()
  }
}
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

.tag-link {
  text-decoration: none;
  color: #007bff;
}

.filter-container {
  width: 85%;
  margin: 10px auto;
}
</style>
