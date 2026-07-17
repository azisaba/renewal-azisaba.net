<script lang="ts" setup>
import type { PatchNoteCategory } from "@azisaba/graph";

defineProps<{
  value: PatchNoteCategory;
}>();

const { t } = useI18n();
</script>

<template>
  <Badge v-twemoji>{{ t(`common.patchNoteCategory.${value}`) }}</Badge>
</template>

<style scoped></style>
