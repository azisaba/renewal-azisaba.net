<template>
  <h1>aaa</h1>
  <h1>{{page.name}}</h1>
  <div v-html="page.content"></div>
  <NuxtLink :href="`/servers/life`">Life</NuxtLink><br>
  <NuxtLink :href="`/servers/leon-gun-war`">LGW</NuxtLink>
</template>

<script setup>
const route = useRoute()

const { data: posts_object, refresh } = useFetch(() =>
    `http://localhost:8056/items/servers/${route.params.slug}`
)
console.log("aaa")
console.log(posts_object)
watch(() => route.params.slug, async () => {
  await refresh()
})
const { data: page } = posts_object

if (!page) throw createError({
  statusCode: 404,
  statusMessage: 'Page Not Found'
})


</script>
