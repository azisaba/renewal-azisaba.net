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

<script setup>
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  vertical-align: middle;
}

div {
  margin-top: 0;
  margin-bottom: 0;
}

footer {
  padding-top: 0;
  background-color: #fafafa;
  /*margin-top: auto;*/
  /*color: aliceblue;*/

  width: 100%;
  bottom: 0;

  margin-top: 3.5vh;
}

.footer-bottom {
  border-top: solid 3px #eae9e9;
  display: flex;
  width: 100%;
  justify-content: space-between;

  min-height: 7vh;
  align-items: center;
}

.dark-mode .footer-bottom{
    border-top: solid 3px #545454;
}

.dark-mode footer{
  background-color: #2c2c2c;
}



@media (475px > width) {
  .footer-bottom {
    width: auto;
    display: block; /* 非表示 */
    text-align: center;
    padding-top: 1vh;
  }
}

</style>