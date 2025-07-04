<template>
  <h1>Blog</h1>
  <ul>
    <li v-for="post in posts" :key="post.id">
      <NuxtLink :href="`/servers/${post.slug}`">
        <h2>{{ post.name }}</h2>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const route = useRoute()
const { data: posts_object, refresh } = await useFetch('http://localhost:8056/items/servers');
const { data: posts} = posts_object.value
console.log(posts)
watch(() => route.query, () => refresh())
</script>