<template>
  <div class="content">
    <MainImage />
    <div class="main-content">
      <div class="main-catch-copy">
        <h1>アジ鯖、たのしい。</h1>
        <p>azisaba.net</p>
      </div>


    </div>
  </div>

</template>

<style scoped>

/*
.content {
  height: 150vh;
}
*/

.main-content {
  position: absolute;
  width: 100%;
  top: 38%;
}

.main-catch-copy {
  text-align: center;
  align-items: center;

  h1 {
    font-size: 3rem;
    padding-left: 17px;
  }
  p {
    font-size: 1.5rem;
  }

  @media (450px >= width) {
    h1 {
      padding-left: 15px;
      font-size: 2.5rem;
    }
  }
}


</style>

<script setup>
</script>
