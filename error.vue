<template>
  <NuxtLayout>
    <div class="content">
      <PageNotFound :message=error?.message />
    </div>
  </NuxtLayout>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.content {
  padding-top: 11vh;
}

.dark-mode body {
  background-color: #3e3e3e;
  color: #ebf4f1;
}

</style>

<script setup lang="ts">
const error = useError();
</script>