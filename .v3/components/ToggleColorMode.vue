<template>
  <div style="display: flex; align-items: center">
    <button @click="toggleColorMode" style="border: none; background: none; cursor: pointer">
      <span style="font-size: 24px" v-if="currentMode && currentMode === 'dark'"
        ><i class="bi bi-moon"
      /></span>
      <span style="font-size: 24px" v-else><i class="bi bi-sun-fill" /></span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const colorMode = useColorMode();

// TODO: If delayed init can be removed, it would be very great
const currentMode = ref<string>();
onMounted(() => {
  currentMode.value = colorMode.value;
});

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
  currentMode.value = colorMode.preference;
};
</script>

<style scoped>
i {
  color: #ebf4f1;
}
</style>
