<template>
  <div class="content">
    <MainImage />
    <div class="main-content">
      <div class="main-catch-copy">
        <h1>アジ鯖、たのしい。</h1>
        <p>azisaba.net</p>
        <p>
          <NuxtLink class="link-arrow" to="/connect">
            接続方法 <span style="scale: -1 1">&#x2B05;🏃</span>
          </NuxtLink>
        </p>
        <p>
          <NuxtLink class="link-arrow-color-only" style="text-decoration: none;" to="/recruit">
            運営応募はこちら
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>

</template>

<style scoped>
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

a.link-arrow-color-only {
  color: midnightblue;
}

.dark-mode a.link-arrow-color-only {
  color: deepskyblue;
}

a.link-arrow {
  text-decoration: none;
  color: midnightblue;
  font-size: 2rem;
}

.dark-mode a.link-arrow {
  color: deepskyblue;
}

a.link-arrow span {
  scale: -1 1;
  color: white;
  text-shadow:
      -1px -1px 0 #000,  /* 左上 */
      1px -1px 0 #000,  /* 右上 */
      -1px  1px 0 #000,  /* 左下 */
      1px  1px 0 #000; /* 右下 */
  display: inline-block;
  transition: 0.1s ease-in;
}

a.link-arrow:hover span {
  transform: translateX(-25%);
}
</style>

<script setup>
console.log("------------------------------")
console.log("あーあ、見つかっちゃった")
console.log("https://azisaba.net/recruit")
console.log("------------------------------")
</script>