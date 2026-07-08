<template>
  <footer>
    <FooterTopBar />
    <div class="footer-bottom">
      <FooterCopyright />
      <FooterAnimation />
      <FooterSocial />
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
* {
  vertical-align: middle;
  margin: 0;
  padding: 0;
}

div {
  margin-top: 0;
  margin-bottom: 0;
}

footer {
  bottom: 0;

  margin-top: 3.5vh;
  background-color: #fafafa;
  padding-top: 0;
  /*margin-top: auto;*/
  /*color: aliceblue;*/

  width: 100%;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: solid 3px #eae9e9;
  width: 100%;

  min-height: 7vh;
}

.dark-mode .footer-bottom {
  border-top: solid 3px #545454;
}

.dark-mode footer {
  background-color: #2c2c2c;
}

@media (475px > width) {
  .footer-bottom {
    display: block; /* 非表示 */
    padding-top: 1vh;
    width: auto;
    text-align: center;
  }
}
</style>
