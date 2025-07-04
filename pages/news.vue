<template>
  <h1>aaaaaa</h1>
</template>

<script setup>
useHead({ title: 'ニュース' })
const res = await useFetch("/api", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ comment: "test" }),
});
</script>