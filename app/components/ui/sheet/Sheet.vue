<script lang="ts" setup>
import type { DialogRootEmits, DialogRootProps } from "reka-ui";
import { DialogRoot, useForwardPropsEmits } from "reka-ui";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DialogRoot data-slot="sheet" v-bind="forwarded" v-slot="slotProps">
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>
