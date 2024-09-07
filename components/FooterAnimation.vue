<template>

  <div class="animation">{{ animation }}</div>

</template>

<script setup >
import { ref } from "vue";

const animationPattarn = [
    "",
    "_",
    "A_",
    "Az_",
    "Azi_",
    "Azis_",
    "Azisa_",
    "Azisab_",
    "Azisaba_",
    "AzisabaN_",
    "AzisabaNe_",
    "AzisabaNet_",
    "AzisabaNetw_",
    "AzisabaNetwo_",
    "AzisabaNetwor_",
    "AzisabaNetwork_",
    "AzisabaNetwork ",
    "AzisabaNetwork ",
    "AzisabaNetwork ",
    "Az-sabaNe-wo-k ",
    "Az_s-b-Ne_wo_- ",
    "-z s_b_N- -o _ ",
    "_z s b N_ _o   ",
    " - s - -   o   ",
    " _ - _ _   -   ",
    "   _       _   ",
    "               ",
    "",
    ""
]
const animation = ref(animationPattarn[0]);
const count = ref(0);

onMounted(() => {
  setInterval(() => {
    if (count.value === animationPattarn.length - 1) count.value = 0;
    else count.value++;

    animation.value = animationPattarn[count.value].toString()
  }, 800);
})
</script>

<style scoped>
.animation {
  white-space: pre;
}
</style>