<template>
  <main class="markdown-element">
    <div v-if="data">
      <h1>{{ data.title }}</h1>
      <ContentRenderer  :value="data" class="markdown-content" />
    </div>
    <PageNotFound v-else message="page is not found."/>
  </main>
</template>

<script setup lang="ts">
  import { useRoute} from 'vue-router'
  const route = useRoute()

  const {data} = await useAsyncData(route.path, () => {
    return queryCollection('rules').path(route.path).first()
  })
  console.log(data)
  useHead({ title: data.value?.title})
</script>