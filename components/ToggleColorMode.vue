<template>
  <div style="display: flex; align-items: center;">
    <button @click="toggleColorMode" style="border: none; background: none; cursor: pointer;">
      <span v-if="colorMode.value === 'dark'" style="font-size: 24px;">🌙</span>
      <span v-else style="font-size: 24px;">☀️</span>
    </button>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
colorMode.preference = 'system';

const toggleColorMode = () => {
  colorMode.preference = (()=>{
    console.log(colorMode.value, colorMode.preference);
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
