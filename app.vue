<template>
  <NuxtLayout>
    <div class="content">
      <NuxtPage/>
    </div>
  </NuxtLayout>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-direction: column;
  color: #000000;
  height: 100%;
}
.content {
  padding-top: 6vh;
}

.dark-mode body {
  background-color: #3e3e3e;
  color: #ebf4f1;
}


</style>