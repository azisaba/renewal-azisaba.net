<template>
  <header>
    <NuxtLink class="site-logo" to="/.v3/public">アジ鯖</NuxtLink>
    <div class="menu-and-color-mode">
      <Menu class="menu" />
      <ToggleColorMode />
    </div>
  </header>
</template>

<script setup>
import ToggleColorMode from "~/components/ToggleColorMode.vue";
import Menu from "~/components/Menu/Menu.vue";
</script>

<style scoped>
header {
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: #333;
  padding-right: 0.7rem;
  padding-left: 2rem;
  height: 4rem;
  color: white;
}

.site-logo {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
}

.header-right-section {
  display: flex;
}

.menu-and-color-mode {
  display: flex;
  align-items: center;
  margin: 0 15px 0 0;
  /*justify-content: center;*/
  padding: 0;
  height: 100%;
}

.menu {
  margin-right: 18px;
}
</style>
