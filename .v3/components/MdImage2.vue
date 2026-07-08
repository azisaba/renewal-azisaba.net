<template>
  <div class="md-image2">
    <v-img :src="props.src1" style="margin: 3px" width="50%" />
    <v-img :src="props.src2" style="margin: 3px" width="50%" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  src1: string;
  src2: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.md-image2 {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
