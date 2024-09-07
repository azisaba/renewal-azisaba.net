<template>
  <footer>
    <FooterTopBar />
    <div class="links">
      <a href="https://www.azisaba.net" target="_blank">Official HP</a> <br>
      <a href="https://discord.com/invite/azisaba" target="_blank">Official Discord</a> <br>
      <a href="https://azisaba.buycraft.net/" target="_blank">Donation Site</a> <br>
    </div>


    <div>
      <h1>Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </div>

    <div class="footer-bottom">
      <FooterCopyright/>
      <FooterAnimation />
      <FooterSocial />
    </div>
  </footer>
</template>

<script setup>
import FooterCopyright from "~/components/FooterCopyright.vue";
import FooterTopBar from "~/components/FooterTopBar.vue";

const colorMode = useColorMode()
console.log(colorMode.preference)
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  vertical-align: middle;
}

div {
  margin-top: 0vh;
  margin-bottom: 0vh;
}

footer {
  padding-top: 0vh;
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

</style>