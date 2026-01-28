<template>
  <div style="display: flex; align-items: center;">
    <button @click="toggleColorMode" style="border: none; background: none; cursor: pointer;">
      <span v-if="colorMode.value === 'dark'" style="font-size: 24px;"><i class="bi bi-moon"></i></span>
      <span v-else style="font-size: 24px;"><i class="bi bi-sun-fill"></i></span>
    </button>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
colorMode.preference = 'system';
console.log("def", colorMode.value, colorMode.preference);
const toggleColorMode = () => {
  colorMode.preference = (()=>{
    console.log("con", colorMode.value, colorMode.preference);
    switch(colorMode.value) {
      case 'dark':
        return 'light';
      case 'light':
        return 'dark';
      default:
        return 'system';
    }
  })()
  console.log("pr", colorMode.preference);
};
</script>

<style scoped>
i{
  color: #ebf4f1;
}

</style>