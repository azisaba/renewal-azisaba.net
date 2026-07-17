<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { useWindowSize } from "@vueuse/core";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";

const props = defineProps<{
  title: string;
  imageUrls: string[];
}>();

const { t } = useI18n();
const openImageUrl = ref<string | null>(null);
const imageSizes = reactive<Record<string, { width: number; height: number }>>({});
const { width: viewportWidth, height: viewportHeight } = useWindowSize();

const imageAlt = (index: number) =>
  `${props.title} ${t("pages.patchNotes.detail.imageAlt", { number: index + 1 })}`;

const setImageSize = (imageUrl: string, event: Event) => {
  if (!(event.currentTarget instanceof HTMLImageElement)) return;

  imageSizes[imageUrl] = {
    width: event.currentTarget.naturalWidth,
    height: event.currentTarget.naturalHeight,
  };
};

const getExpandedImageStyle = (imageUrl: string): CSSProperties | undefined => {
  const imageSize = imageSizes[imageUrl];
  if (!imageSize || !viewportWidth.value || !viewportHeight.value) return;

  const viewportMargin = viewportWidth.value >= 640 ? 64 : 32;
  const availableWidth = viewportWidth.value - viewportMargin;
  const availableHeight = viewportHeight.value - viewportMargin;
  const scale = Math.min(availableWidth / imageSize.width, availableHeight / imageSize.height);

  return {
    width: `${Math.floor(imageSize.width * scale)}px`,
    height: `${Math.floor(imageSize.height * scale)}px`,
  };
};
</script>

<template>
  <div
    class="mt-8 grid gap-6"
    :class="{
      'mx-auto max-w-3xl': imageUrls.length === 1,
      'sm:grid-cols-2': imageUrls.length > 1,
    }"
    v-if="imageUrls.length"
  >
    <Dialog
      :key="imageUrl"
      :open="openImageUrl === imageUrl"
      @update:open="openImageUrl = $event ? imageUrl : null"
      v-for="(imageUrl, index) in imageUrls"
    >
      <DialogTrigger as-child>
        <button
          type="button"
          class="cursor-zoom-in self-start overflow-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
          :aria-label="imageAlt(index)"
          :class="{
            'mx-auto w-fit max-w-full': imageUrls.length === 1,
            'w-full': imageUrls.length > 1,
          }"
        >
          <NuxtImg
            class="block transition-transform duration-300 ease-out hover:scale-[1.02]"
            :alt="imageAlt(index)"
            :class="{
              'h-auto max-h-128 w-auto max-w-full': imageUrls.length === 1,
              'h-auto w-full': imageUrls.length > 1,
            }"
            :src="imageUrl"
            loading="lazy"
          />
        </button>
      </DialogTrigger>

      <DialogContent
        class="flex h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-none items-center justify-center border-0 bg-transparent p-0 text-white shadow-none sm:h-[calc(100dvh-4rem)] sm:w-[calc(100vw-4rem)] sm:max-w-none"
        @click="openImageUrl = null"
      >
        <DialogTitle class="sr-only">
          {{ imageAlt(index) }}
        </DialogTitle>
        <NuxtImg
          class="block max-h-full max-w-full transition-opacity duration-150"
          :alt="imageAlt(index)"
          :class="imageSizes[imageUrl] ? 'opacity-100' : 'opacity-0'"
          :src="imageUrl"
          :style="getExpandedImageStyle(imageUrl)"
          @click.stop
          @load="setImageSize(imageUrl, $event)"
        />
      </DialogContent>
    </Dialog>
  </div>
</template>
