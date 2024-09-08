<template>
  <div class="not-found-content">
    <div class="stack">
      <h1>404</h1>
      <p class="error-message">{{ message }}</p>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

.not-found-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.stack h1 {

  font-size: 6rem;
  letter-spacing: 0.5rem;
  text-align: center;
  line-height: 1;
  color: pink;
}

.error-message {
  font-weight: lighter;
}
</style>

<script setup lang="ts">
interface Props {
  message: String
}

const props = defineProps<Props>()

</script>