<template>
  <div class="not-found-content">
    <div class="stack">
      <h1>404</h1>
      <p class="error-message">{{ props.message }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  message: string;
}

const props = defineProps<Props>();

//const error = useError();
useHead({ title: "404 Not Found - アジ鯖公式サイト" });
</script>

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
  color: pink;
  font-size: 6rem;
  line-height: 1;
  letter-spacing: 0.5rem;
  text-align: center;
}

.error-message {
  font-weight: lighter;
}
</style>
