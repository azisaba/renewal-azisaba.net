<template>
  <div class="page">
    <NavigationBar />
    <div class="slot">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh; /* 全体の高さを最低でもビューポートの100%にする */
  display: flex; /* 子クラスを横並びにする */
  flex-direction: column; /* 子クラスの横並びの方向を縦にする */
}

.slot {
  flex: 1; /* flexに1つだけ数値を指定するとその要素は伸びる */
}

/* NavbarとBottomにはflexを指定しないので伸びない */
/* 結果としてページファイルの中味だけが伸びて、ビューポート100%を実現 */
/* Bottomは下に貼り付く。スティッキーフッターを実現 */
</style>