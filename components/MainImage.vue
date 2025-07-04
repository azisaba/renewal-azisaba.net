<template>
  <div class="main-image">

  </div>


</template>

<style scoped>
.main-image {
  min-height: 50vh;

  background-image: url(https://i.azisaba.net/albums/2020-11-01_06.01.22.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  background-color: rgba(255, 255, 255, 0.34);
  background-blend-mode: overlay;
}

.main-content {
  position: absolute;
  justify-content: center;

  align-items: center;
  text-align: center;
  top: 40%;

  width: 100%;

}

.main-content h1 {
  font-size: 3rem;
}

.main-content p {
  font-size: 1.5rem;
}

.dark-mode .main-image{
  background-color: rgba(0, 0, 0, 0.47);
}

.dark-mode .content {
  color: #dddddd;
}

</style>
<script setup>
</script>