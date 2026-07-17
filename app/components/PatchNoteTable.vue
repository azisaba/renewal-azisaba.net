<script lang="ts" setup>
import type { ListPatchNotes200Response, PatchNoteCategory, PatchNoteTarget } from "@azisaba/graph";
import { formatTimeAgoIntl } from "@vueuse/core";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const pageSize = 20;

const props = defineProps<{
  target?: PatchNoteTarget;
  category?: PatchNoteCategory;
}>();

const { locale } = useI18n();

const formatRelativeTime = (date: Date | string) =>
  formatTimeAgoIntl(new Date(date), {
    locale: locale.value,
    insertSpace: false,
    relativeTimeFormatOptions: {
      numeric: "always",
    },
  });

const createEmptyPage = (): ListPatchNotes200Response => ({
  items: [],
  nextCursor: null,
});

const filterQuery = () => ({
  target: props.target,
  category: props.category,
});

const fetchPatchNotes = (cursor?: string | null) =>
  $fetch<ListPatchNotes200Response>("/api/patch-notes", {
    cache: "no-store",
    query: {
      limit: pageSize,
      cursor: cursor ?? undefined,
      ...filterQuery(),
    },
  });

const initialDataKey = `patch-notes-${props.target ?? "all"}-${props.category ?? "all"}`;

const { data: initialPatchNotes } = await useAsyncData(initialDataKey, () => fetchPatchNotes(), {
  server: false,
  default: createEmptyPage,
});

const pages = ref<ListPatchNotes200Response[]>([initialPatchNotes.value ?? createEmptyPage()]);

const currentPageIndex = ref(0);
const isLoading = ref(false);

let requestVersion = 0;

watch(initialPatchNotes, (value) => {
  if (!value) return;

  pages.value = [value];
  currentPageIndex.value = 0;
});

const getLastPage = () => pages.value.at(-1) ?? createEmptyPage();

const patchNotes = computed(() => pages.value[currentPageIndex.value] ?? createEmptyPage());

const currentPage = computed(() => currentPageIndex.value + 1);

const paginationTotal = computed(() => {
  const lastPage = getLastPage();

  const loadedItemCount = (pages.value.length - 1) * pageSize + lastPage.items.length;

  return loadedItemCount + (lastPage.nextCursor ? pageSize : 0);
});

const reload = async () => {
  const version = ++requestVersion;

  isLoading.value = true;

  try {
    const firstPage = await fetchPatchNotes();

    if (version !== requestVersion) return;

    pages.value = [firstPage];
    currentPageIndex.value = 0;
  } finally {
    if (version === requestVersion) {
      isLoading.value = false;
    }
  }
};

watch([() => props.target, () => props.category], () => reload());

const showPage = async (page: number) => {
  if (isLoading.value || page === currentPage.value) {
    return;
  }

  const pageIndex = page - 1;

  if (pages.value[pageIndex]) {
    currentPageIndex.value = pageIndex;
    return;
  }

  const lastPage = getLastPage();

  if (pageIndex !== pages.value.length || !lastPage.nextCursor) {
    return;
  }

  const version = requestVersion;

  isLoading.value = true;

  try {
    const nextPage = await fetchPatchNotes(lastPage.nextCursor);

    if (version !== requestVersion) return;

    pages.value.push(nextPage);
    currentPageIndex.value = pageIndex;
  } finally {
    if (version === requestVersion) {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <Table class="min-w-[36rem] table-fixed sm:min-w-3xl">
    <TableHeader>
      <TableRow>
        <TableHead class="w-[42%] sm:w-1/2"> タイトル </TableHead>
        <TableHead class="w-[21%] sm:w-1/5"> サーバー </TableHead>
        <TableHead class="w-[22%] sm:w-[18%]"> カテゴリ </TableHead>
        <TableHead class="w-[15%] sm:w-[12%]"> 日時 </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow
        tabindex="0"
        role="link"
        class="group cursor-pointer focus-visible:bg-slate-50 focus-visible:outline-none"
        :aria-label="patchNote.title"
        :key="patchNote.id"
        @click="navigateTo(`/patch-notes/${patchNote.id}`)"
        @keydown.enter="navigateTo(`/patch-notes/${patchNote.id}`)"
        @keydown.space.prevent="navigateTo(`/patch-notes/${patchNote.id}`)"
        v-for="patchNote in patchNotes.items"
      >
        <TableCell class="overflow-hidden">
          <span
            class="block truncate transition-colors duration-200 group-hover:text-blue-500"
            :title="patchNote.title"
          >
            {{ patchNote.title }}
          </span>
        </TableCell>

        <TableCell>
          <PatchNoteTargetBadge :value="patchNote.target" />
        </TableCell>

        <TableCell>
          <PatchNoteCategoryBadge :value="patchNote.category" />
        </TableCell>

        <TableCell>
          <time
            :datetime="new Date(patchNote.createdAt).toISOString()"
            :title="new Date(patchNote.createdAt).toLocaleString(locale)"
          >
            {{ formatRelativeTime(patchNote.createdAt) }}
          </time>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>

  <Pagination
    class="mt-6"
    :disabled="isLoading"
    :items-per-page="pageSize"
    :page="currentPage"
    :sibling-count="1"
    :total="paginationTotal"
    @update:page="showPage"
  >
    <PaginationContent v-slot="{ items }">
      <PaginationPrevious />

      <template :key="`${item.type}-${index}`" v-for="(item, index) in items">
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
</template>
