<template>
    <ArticleCard :path="path" :image="image" :image_cover="image_cover">
        <template #title>
            {{ title }}
        </template>
        <template #description>
            {{ description }}
        </template>
        <template #meta>
            {{ author && ` by ${author}` }}
            {{ date && ` on ${dayjs(date).format("YYYY-MM-DD")}` }}
        </template>
    </ArticleCard>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
dayjs().format()

defineProps<{
    path: string,
    title: string,
    description: string | null,
    author: string | null,
    date: string,
    image: string | null,
    image_cover: boolean | undefined,
}>()
</script>

<style scoped></style>
