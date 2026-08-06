<script lang="ts" setup>
import type { Collections } from "@nuxt/content";

const props = withDefaults(
  defineProps<{
    articles: Collections["article"][];
    itemsPerPage?: number;
  }>(),
  {
    itemsPerPage: 8,
  },
);

const route = useRoute();
const router = useRouter();

const pageCount = computed(() =>
  Math.max(1, Math.ceil(props.articles.length / props.itemsPerPage)),
);

const currentPage = computed({
  get() {
    const page = Number(route.query.page);

    if (!Number.isInteger(page) || page < 1) {
      return 1;
    }

    return Math.min(page, pageCount.value);
  },
  set(page: number) {
    router.push({
      query: {
        ...route.query,
        page: page === 1 ? undefined : String(page),
      },
    });
  },
});

const visibleArticles = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;

  return props.articles.slice(start, start + props.itemsPerPage);
});

function changePage(page: number) {
  currentPage.value = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <ArticleListItem :key="article.path" :value="article" v-for="article in visibleArticles" />
    </div>

    <Pagination
      :items-per-page="itemsPerPage"
      :page="currentPage"
      :sibling-count="1"
      :total="articles.length"
      @update:page="changePage"
      show-edges
      v-if="pageCount > 1"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />

        <template :key="index" v-for="(item, index) in items">
          <PaginationItem
            :is-active="item.value === currentPage"
            :value="item.value"
            v-if="item.type === 'page'"
          >
            {{ item.value }}
          </PaginationItem>

          <PaginationEllipsis :index="index" v-else />
        </template>

        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>

<style scoped></style>
