<script lang="ts" setup>
import { ChevronDown, MessageCircleQuestionMark } from "@lucide/vue";
import type { Collections } from "@nuxt/content";

type Faq = Collections["faq"];

defineProps<{
  value: Faq;
}>();

const isOpen = ref(false);
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-5">
    <button
      type="button"
      class="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-bold text-slate-900"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="flex min-w-0 items-center gap-3">
        <MessageCircleQuestionMark class="size-5 shrink-0 text-gray-500" />
        <span>{{ value.question }}</span>
      </span>

      <ChevronDown
        class="size-5 shrink-0 text-gray-500 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      class="grid transition-all duration-300 ease-out"
      :class="isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'"
    >
      <div class="overflow-hidden">
        <p class="mt-4 leading-7 whitespace-pre-line text-slate-700">
          {{ value.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
