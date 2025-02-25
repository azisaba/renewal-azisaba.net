<template>
  <div class="social">
    <a href="https://discord.com/invite/azisaba" target="_blank"><i class="bi bi-discord"></i></a>
    <a href="https://twitter.com/AzisabaNetwork" target="_blank"><i class="bi bi-twitter-x"></i></a>
    <a href="https://www.youtube.com/@AzisabaNetwork" target="_blank"><i class="bi bi-youtube"></i></a>
    <a href="https://github.com/AzisabaNetwork" target="_blank"><i class="bi bi-github"></i></a>
  </div>
</template>

<style scoped>
.social {
  padding-top: 0;
  padding-right: 10px;
  color: #235786;
  font-size: 27px;
  width: 280px;
  text-align: right;
}

a:link, a:visited, a:hover, a:active {
  color: #235786;
}

i {
  margin-right: 3px;
  margin-left: 3px;
}

.dark-mode i{
  color: #ebf4f1;
}

@media (710px >= width) {
  .social {
    width: auto;
    text-align: center;
  }
}

@media (475px > width) {
  .social {
    padding-right: 0;
  }
}
</style>

<script setup lang="ts">
</script>