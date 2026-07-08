<template>
  <div class="main-image" />
</template>

<script setup></script>
<style scoped>
.main-image {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;

  /*background-image: url(https://i.azisaba.net/albums/2020-11-01_06.01.22.png);*/
  background-image: url("../assets/toppage-image01.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  background-color: rgba(255, 255, 255, 0.34);
  background-blend-mode: overlay;
  width: 100%;
  height: 100%;
  min-height: 50vh;
}

.main-content {
  position: absolute;
  top: 40%;
  justify-content: center;

  align-items: center;

  width: 100%;
  text-align: center;
}

.main-content h1 {
  font-size: 3rem;
}

.main-content p {
  font-size: 1.5rem;
}

.dark-mode .main-image {
  background-color: rgba(0, 0, 0, 0.47);
}

.dark-mode .content {
  color: #dddddd;
}
</style>
