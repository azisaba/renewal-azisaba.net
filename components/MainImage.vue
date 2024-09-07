<template>
  <div class="main-image">
    <div class="content">
      <h1>アジ鯖、たのしい。</h1>
      <p>azisaba.net</p>
    </div>
  </div>

</template>

<style scoped>
.main-image {
  min-height: 50vh;
  text-align: center;

  background-image: url(https://i.azisaba.net/albums/2020-11-01_06.01.22.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 他のコンテンツが前に表示されるように */

}

.content {
  position: relative;
  z-index: 1;
}

</style>
<script setup>
</script>