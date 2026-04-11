<template>
  <header>
    <NuxtLink class="site-logo" to="/">アジ鯖</NuxtLink>
    <div class="header-right-section">
      <navigation-bar />
      <ToggleColorMode />
    </div>
  </header>
</template>

<script setup>
import ToggleColorMode from "~/components/ToggleColorMode.vue";
</script>

<style scoped>
header {
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
}

.site-logo {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
}

.header-right-section{
  display: flex;
}

.dark-mode footer{
  background-color: #2c2c2c;
}

@media (475px > width) {
  .footer-bottom {
    width: auto;
    display: block; /* 非表示 */
    text-align: center;
    padding-top: 1vh;
  }
}

</style>