<script lang="ts" setup>
import type { PatchNote } from "@azisaba/graph";
import { formatTimeAgoIntl } from "@vueuse/core";
import { TableCell, TableRow } from "~/components/ui/table";

defineProps<{
  value: PatchNote;
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
</script>

<template>
  <TableRow
    tabindex="0"
    role="link"
    class="group cursor-pointer focus-visible:bg-slate-50 focus-visible:outline-none"
    :aria-label="value.title"
    :key="value.id"
    @click="navigateTo(`/patch-notes/${value.id}`)"
    @keydown.enter="navigateTo(`/patch-notes/${value.id}`)"
    @keydown.space.prevent="navigateTo(`/patch-notes/${value.id}`)"
  >
    <TableCell class="overflow-hidden">
      <span
        class="block truncate transition-colors duration-200 group-hover:text-blue-500"
        :title="value.title"
      >
        {{ value.title }}
      </span>
    </TableCell>

    <TableCell>
      <PatchNoteTargetBadge :value="value.target" />
    </TableCell>

    <TableCell>
      <PatchNoteCategoryBadge :value="value.category" />
    </TableCell>

    <TableCell>
      <time
        :datetime="new Date(value.createdAt).toISOString()"
        :title="new Date(value.createdAt).toLocaleString(locale)"
      >
        {{ formatRelativeTime(value.createdAt) }}
      </time>
    </TableCell>
  </TableRow>
</template>

<style scoped></style>
