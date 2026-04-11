<template>
  <div class="md-image2">
    <v-img style="margin: 3px" :src="props.src1" width="50%" />
    <v-img style="margin: 3px" :src="props.src2" width="50%" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  src1: string;
  src2: string;
}

const props = defineProps<Props>()
</script>

<style scoped>
.md-image2 {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
