<script lang="ts" setup>
import { Copy } from "@lucide/vue";

const props = defineProps<{
  value: string;
}>();

const { t } = useI18n();

const hovered = ref(false);
const copied = ref(false);

const tooltipOpen = computed(() => hovered.value || copied.value);

async function copy() {
  await navigator.clipboard.writeText(props.value);

  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1000);
}
</script>

<template>
  <TooltipProvider>
    <Tooltip :open="tooltipOpen">
      <TooltipTrigger as-child>
        <button
          type="button"
          class="flex cursor-pointer items-center gap-2 border border-white px-4 py-2"
          @click="copy"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
          <div
            class="flex items-center gap-1 transition-colors duration-300"
            :class="copied ? 'text-green-400' : hovered ? 'text-white' : 'text-slate-200'"
          >
            <Copy class="size-4" />
            <slot />
          </div>

          {{ value }}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ copied ? t("common.copied") : t("common.clickToCopy") }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped></style>
