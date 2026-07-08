<template>
  <div class="filter-container">
    <v-select
      :items="allTags"
      @update:model-value="(arr) => replaceTags(arr)"
      label="タグで絞り込む"
      multiple
      v-model="tags"
    />
  </div>
  <div class="article-container" v-if="data?.length">
    <RecruitArticleCard
      :description="article.description"
      :image="article.image"
      :image_cover="article.image_cover"
      :key="article.path"
      :path="article.path"
      :title="article.title"
      v-for="article in data"
    >
      <template #tags>
        <template v-if="article.tags">
          <NuxtLink class="tag-link" :href="'?tags=' + tag" :key="tag" v-for="tag in article.tags">
            #{{ tag }}
          </NuxtLink>
        </template>
      </template>
    </RecruitArticleCard>
  </div>
  <div class="no-recruit" v-else>
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
import RecruitArticleCard from "~/components/ArticleCard/RecruitArticleCard.vue";

const { data: rawData } = await useAsyncData("recruits", () => queryCollection("recruits").all());
const data = ref(rawData.value);
const allTags = (
  rawData.value?.filter((e) => e.published)?.flatMap((e) => e.tags || []) || []
).filter((v, i, a) => a.indexOf(v) === i);
const tags = ref<string[]>([]);
const queueRefresh = () => {
  setTimeout(() => {
    const query = new URLSearchParams(location?.search?.slice(1));
    let tagsFilter = String(query.get("tags") || "").split(",") || [];
    if (tagsFilter[0] === "") tagsFilter = [];
    let localData =
      rawData.value?.filter((e) => e.published)?.toSorted((a, b) => b.path.localeCompare(a.path)) ||
      null;
    if (tagsFilter.length > 0) {
      localData =
        localData?.filter((article) => article.tags?.some((tag) => tagsFilter.includes(tag))) ||
        null;
    }
    tags.value = tagsFilter;
    data.value = localData;
  }, 10);
};
onMounted(queueRefresh);
onBeforeRouteUpdate(queueRefresh);

const replaceTags = (tags: string | readonly string[] | null) => {
  if (tags === null) {
    history.replaceState(null, "", "");
    queueRefresh();
  } else {
    const array = Array.isArray(tags) ? tags : [tags];
    history.replaceState(null, "", `?tags=${array.join(",")}`);
    queueRefresh();
  }
};
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

.no-recruit {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.tag-link {
  color: #007bff;
  text-decoration: none;
}

.filter-container {
  margin: 10px auto;
  width: 85%;
}
</style>
