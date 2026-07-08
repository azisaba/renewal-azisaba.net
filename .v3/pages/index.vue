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
          <NuxtLink class="link-arrow-color-only" style="text-decoration: none" to="/recruit">
            運営応募はこちら
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
console.log("------------------------------");
console.log("あーあ、見つかっちゃった");
console.log("https://azisaba.net/recruit");
console.log("------------------------------");
</script>

<style scoped>
.main-content {
  position: absolute;
  top: 38%;
  width: 100%;
}

.main-catch-copy {
  align-items: center;
  text-align: center;

  h1 {
    padding-left: 17px;
    font-size: 3rem;
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
  color: midnightblue;
  font-size: 2rem;
  text-decoration: none;
}

.dark-mode a.link-arrow {
  color: deepskyblue;
}

a.link-arrow span {
  display: inline-block;
  scale: -1 1;
  transition: 0.1s ease-in;
  color: white;
  text-shadow:
    -1px -1px 0 #000,
    /* 左上 */ 1px -1px 0 #000,
    /* 右上 */ -1px 1px 0 #000,
    /* 左下 */ 1px 1px 0 #000; /* 右下 */
}

a.link-arrow:hover span {
  transform: translateX(-25%);
}
</style>
