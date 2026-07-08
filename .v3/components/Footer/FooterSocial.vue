<template>
  <div class="social">
    <a href="https://discord.com/invite/azisaba" target="_blank"><i class="bi bi-discord" /></a>
    <a href="https://x.com/AzisabaNetwork" target="_blank"><i class="bi bi-twitter-x" /></a>
    <a href="https://www.youtube.com/@AzisabaNetwork" target="_blank"
      ><i class="bi bi-youtube"
    /></a>
    <a href="https://github.com/AzisabaNetwork" target="_blank"><i class="bi bi-github" /></a>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.social {
  padding-top: 0;
  padding-right: 10px;
  width: 280px;
  color: #235786;
  font-size: 27px;
  text-align: right;
}

a:link,
a:visited,
a:hover,
a:active {
  color: #235786;
}

i {
  margin-right: 3px;
  margin-left: 3px;
}

.dark-mode i {
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
