<template>
  <v-img style="margin: 0" :src="props.src" width="50%" />
  <span style="font-size: 0.8em; color: lightgray" v-if="props.text">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
interface Props {
  src: string;
  text?: string;
}

const props = defineProps<Props>()
</script>
