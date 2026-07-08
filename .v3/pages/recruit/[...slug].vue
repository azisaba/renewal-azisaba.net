<template>
  <main class="markdown-element">
    <article v-if="data && data.published">
      <v-img
        class="cover-image"
        :cover="data.image_cover"
        :src="data.image"
        max-height="600px"
        v-if="data.image"
      />
      <h1>{{ data.title }}</h1>
      <span style="font-size: 20px" v-if="data.recruit_id"
        >募集ID: <ClickToCopy :text="data.recruit_id"
      /></span>
      <hr />
      <div class="markdown-content">
        <div v-if="data.recruit_id">
          <div v-if="data.server">
            <h3 id="department">募集部署</h3>
            <p>{{ data.server }}</p>
          </div>
          <h3 id="title">職種</h3>
          <p>{{ data.title }}</p>
        </div>
        <ContentRenderer :value="data" />
      </div>
      <div v-if="data.recruit_id">
        <hr />
        <h3>応募の流れ</h3>
        <ol>
          <li>応募したいサーバーの職種の概要を確認しよう</li>
          <li>タイトルの下に記載されている募集IDをコピーしよう</li>
          <li>
            下の応募フォームから必要事項を記入しよう
            <br />
            <a href="https://forms.gle/71PiZLnU5GC4b6FTA">https://forms.gle/71PiZLnU5GC4b6FTA</a>
          </li>
          <li>完了！</li>
        </ol>
      </div>
      <hr />
      <p>
        <span>タグ: </span>
        <a class="tag-link" :href="'/recruits?tags=' + tag" :key="tag" v-for="tag in data.tags">{{
          tag
        }}</a>
      </p>
    </article>
    <PageNotFound message="page is not found." v-else />
  </main>
</template>

<script setup>
const route = useRoute();
const { data } = await useAsyncData(`recruit-${route.path}`, () => {
  return queryCollection("recruit").path(route.path).first();
});
if (data.value) {
  const meta = [{ name: "description", content: data.value.description }];
  meta.push({ property: "og:title", content: data.value.title });
  meta.push({ property: "og:site_name", content: "アジ鯖求人" });
  meta.push({ property: "og:description", content: data.value.description });
  meta.push({ property: "og:type", content: "website" });
  if (data.value.image) {
    meta.push({ property: "og:image", content: data.value.image });
    meta.push({ property: "twitter:card", content: "summary_large_image" });
  }
  useHead({
    title: `${data.value.title} - アジ鯖求人`,
    meta,
  });
}
</script>

<style scoped>
.cover-image {
  margin-bottom: 1rem;
}

hr {
  margin: 2rem 0;
}

a.tag-link {
  display: inline-block;
  margin-right: 0.5rem;
  border: 1px solid #007bff;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: #007bff;
  text-decoration: none;
}
</style>
