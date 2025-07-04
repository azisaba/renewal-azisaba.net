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
  padding-top: 6vh;
}
</style>

<script setup lang="ts">
const error = useError();
useHead({ title: '404 Not Found - アジ鯖公式ホームページ' })
</script>
