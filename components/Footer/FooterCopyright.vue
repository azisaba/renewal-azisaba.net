<template>
    <div class="copyright">
      <p>Copyright 2017-{{(new Date()).getFullYear()}} Azisaba Network</p>
    </div>
</template>

<style scoped>
.copyright {
  padding-left: 10px;
  width: 280px;
  box-sizing: content-box;
}

@media (710px >= width) {
  .copyright {
    width: auto;
  }
}
</style>