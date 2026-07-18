<script lang="ts" setup>
import type { PatchNoteCategory } from "@azisaba/graph";

const { title, category, categoryLabel, authorId, authorName } = defineProps<{
  title: string;
  category: PatchNoteCategory;
  categoryLabel: string;
  authorId?: string;
  authorName?: string;
}>();

const categoryColors = {
  balance: "#f59e0b",
  feature: "#8b5cf6",
  fix: "#f43f5e",
  improvement: "#0ea5e9",
} satisfies Record<PatchNoteCategory, string>;
</script>

<template>
  <div class="bg-azisaba box-border flex h-full w-full flex-col p-16 text-white" v-twemoji>
    <div class="flex shrink-0 items-start justify-between">
      <div class="flex items-center gap-5">
        <img
          alt="アジ鯖"
          class="size-16 shrink-0 rounded-lg object-contain"
          src="/images/logo.png"
        />

        <div class="h-10 w-px bg-white/40" />

        <span class="text-[36px] leading-none font-bold"> パッチノート </span>
      </div>

      <div class="flex items-start">
        <div
          class="rounded-full px-8 py-4 text-[32px] leading-none font-bold text-white"
          :style="{ backgroundColor: categoryColors[category] }"
        >
          {{ categoryLabel }}
        </div>
      </div>
    </div>

    <div class="flex min-h-0 flex-1 items-center justify-center px-10">
      <h1 class="m-0 text-center text-[72px] leading-[1.1] font-black break-all">
        {{ title }}
      </h1>
    </div>

    <div class="flex shrink-0 items-center gap-4 self-start" v-if="authorName && authorId">
      <img
        class="size-16 shrink-0 [image-rendering:pixelated]"
        :alt="authorName"
        :src="`https://api.mineatar.io/head/${authorId}`"
      />

      <div class="text-[30px] font-bold">
        {{ authorName }}
      </div>
    </div>
  </div>
</template>
