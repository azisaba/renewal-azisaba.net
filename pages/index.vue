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


.content {
  height: 100vh;
}


.main-content {
  position: absolute;
  width: 100%;
  top: 45%;
}

.main-catch-copy {
  position: fixed;
  width: 100%;
  text-align: center;
  align-items: center;

  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;

  }

}
</style>

<script setup>
useHead({ title: 'ホーム' })
</script>
