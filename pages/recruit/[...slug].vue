<template>
  <main class="markdown-element">
    <article v-if="data && data.published">
      <v-img
          v-if="data.image"
          :src="data.image"
          :cover="data.image_cover"
          max-height="600px"
          class="cover-image"
      ></v-img>
      <h1>{{ data.title }}</h1>
      <span v-if="data.recruit_id" style="font-size: 20px">募集ID: <ClickToCopy :text="data.recruit_id"/></span>
      <hr />
      <div class="markdown-content">
        <div v-if="data.recruit_id">
          <div v-if="data.server">
            <h3 id="department">募集部署</h3>
            <p>{{data.server}}</p>
          </div>
          <h3 id="title">職種</h3>
          <p>{{data.title}}</p>
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
        <a v-for="tag in data.tags" :key="tag" class="tag-link" :href="'/recruit#tags=' + tag">{{ tag }}</a>
      </p>
    </article>
    <PageNotFound v-else message="page is not found."/>
  </main>
</template>

<script setup>
const route = useRoute()
const { data } = await useAsyncData(`recruit-${route.path}`, () => {
  return queryCollection('recruit').path(route.path).first()
})
if (data.value) {
  const meta = [{ name: 'description', content: data.value.description }]
  meta.push({ property: 'og:title', content: data.value.title })
  meta.push({ property: 'og:site_name', content: 'アジ鯖求人' })
  meta.push({ property: 'og:description', content: data.value.description })
  meta.push({ property: 'og:type', content: 'website' })
  if (data.value.image) {
    meta.push({ property: 'og:image', content: data.value.image })
    meta.push({ property: 'twitter:card', content: 'summary_large_image' })
  }
  useHead({
    title: `${data.value.title} - アジ鯖求人`,
    meta,
  })
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
  text-decoration: none;
  color: #007bff;
  border: 1px solid #007bff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  display: inline-block;
}
</style>
