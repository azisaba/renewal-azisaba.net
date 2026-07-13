<script lang="ts" setup>
defineProps<{
  src: string;
}>();
</script>

<template>
  <NuxtImg
    alt="Hero image"
    class="hero-floating-image pointer-events-none absolute right-[max(1.5rem,calc((100%-64rem)/2+1.5rem))] bottom-0 h-36 w-auto object-contain md:right-[max(2rem,calc((100%-64rem)/2+2rem))]"
    :src="src"
  />
</template>

<style scoped>
.hero-floating-image {
  animation: slide-in 350ms ease-out both;
}

@keyframes slide-in {
  from {
    transform: translateY(32px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
