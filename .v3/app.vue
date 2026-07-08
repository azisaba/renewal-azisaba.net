<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | アジ鯖公式サイト` : "アジ鯖公式サイト";
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
  height: 100%;
  color: #000000;
}
.content {
  padding-top: 6vh;
}

.dark-mode body {
  background-color: #3e3e3e;
  color: #ebf4f1;
}

:root {
  color-scheme: auto !important;
}
</style>
