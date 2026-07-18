<script lang="ts" setup></script>

<template>
  <div class="hero-content relative z-10 max-w-2xl" v-twemoji>
    <h1 class="font-display flex items-center gap-2 text-4xl font-bold tracking-wide">
      <slot name="title" />
    </h1>

    <div class="mt-4 flex flex-col gap-4 text-slate-200">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.hero-content {
  animation: slide-in 300ms ease-out both;
}

@keyframes slide-in {
  from {
    transform: translateY(-24px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
