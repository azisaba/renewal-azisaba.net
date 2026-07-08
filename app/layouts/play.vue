<script lang="ts" setup></script>

<template>
  <div class="relative">
    <Header class="absolute inset-x-0 top-0 z-20" transparent />
    <main>
      <slot />
    </main>
  </div>
  <Footer />
</template>

<style scoped></style>
