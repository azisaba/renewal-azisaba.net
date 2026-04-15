<template>
  <header>
    <NuxtLink class="site-logo" to="/">アジ鯖</NuxtLink>
    <div class="menu-and-color-mode">
      <Menu class="menu" />
      <ToggleColorMode />
    </div>
  </header>
</template>

<script setup>
import ToggleColorMode from "~/components/ToggleColorMode.vue";
import Menu from "~/components/Menu/Menu.vue"

</script>

<style scoped>
header {
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding-left: 2rem;
  padding-right: 0.7rem;
  background-color: #333;
  color: white;
  z-index: 10;
}

.site-logo {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
}

.header-right-section{
  display: flex;
}

.menu-and-color-mode {
  display: flex;
  align-items: center;
  height: 100%;
  /*justify-content: center;*/
  padding: 0;
  margin: 0;
}

.menu {
  margin-right: 15px;
}

</style>