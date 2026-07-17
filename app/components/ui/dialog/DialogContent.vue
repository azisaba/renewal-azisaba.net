<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { X } from "@lucide/vue";
import { reactiveOmit } from "@vueuse/core";
import { DialogClose, DialogContent, DialogPortal, useForwardPropsEmits } from "reka-ui";
import { cn } from "@/lib/utils";
import DialogOverlay from "./DialogOverlay.vue";

interface Props extends DialogContentProps {
  class?: HTMLAttributes["class"];
  showCloseButton?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  showCloseButton: true,
});
const emits = defineEmits<DialogContentEmits>();
const delegatedProps = reactiveOmit(props, "class", "showCloseButton");
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <DialogContent
      :class="
        cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          props.class,
        )
      "
      data-slot="dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
    >
      <slot />

      <DialogClose
        class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground pointer-events-auto absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
        v-if="showCloseButton"
      >
        <X class="size-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
