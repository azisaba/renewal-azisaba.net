<script lang="ts" setup>
import type { DialogTitleProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { DialogTitle } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>();
const delegatedProps = reactiveOmit(props, "class");
</script>

<template>
  <DialogTitle
    :class="cn('text-lg leading-none font-semibold', props.class)"
    data-slot="dialog-title"
    v-bind="delegatedProps"
  >
    <slot />
  </DialogTitle>
</template>
