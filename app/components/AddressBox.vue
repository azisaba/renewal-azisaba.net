<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  value: string;
}>();

const attrs = useAttrs();

const typed = ref("");
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

onMounted(() => {
  let index = 0;

  const timer = setInterval(() => {
    typed.value = props.value.slice(0, index + 1);
    index++;

    if (index >= props.value.length) {
      clearInterval(timer);
    }
  }, 150);
});
</script>

<template>
  <TooltipProvider>
    <Tooltip :open="tooltipOpen">
      <TooltipTrigger as-child>
        <div
          :class="[
            'flex h-11 cursor-pointer items-center justify-center border-2 border-neutral-400 bg-black',
            attrs.class,
          ]"
          @click="copy"
          @mouseenter="hovered = true"
          @mouseleave="hovered = false"
        >
          <p class="font-pixel select-none">{{ typed }}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent
        class="rounded-none bg-neutral-950 outline -outline-offset-2 outline-violet-950"
      >
        <p class="font-pixel text-lg text-white">
          {{ copied ? $t("common.copied") : $t("common.clickToCopy") }}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped></style>
