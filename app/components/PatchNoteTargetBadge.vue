<script lang="ts" setup>
import type { PatchNoteTarget } from "@azisaba/graph";

defineProps<{
  value: PatchNoteTarget;
}>();

const { t } = useI18n();
</script>

<template>
  <Badge v-twemoji>{{ t(`common.patchNoteTarget.${value}`) }}</Badge>
</template>

<style scoped></style>
