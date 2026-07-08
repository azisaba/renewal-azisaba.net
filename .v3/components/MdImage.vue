<template>
  <v-img :src="props.src" style="margin: 0" width="50%" />
  <span style="font-size: 0.8em; color: lightgray" v-if="props.text">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
interface Props {
  src: string;
  text?: string;
}

const props = defineProps<Props>();
</script>
