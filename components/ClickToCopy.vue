<template>
  <div ref="tooltip" class="tooltip">コピーしました！</div>
  <span class="click-to-copy" @click="copyText" title="クリックでコピー">
    {{ props.text }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{text: string}>()
const tooltip = ref<HTMLElement>()

const copyText = () => {
  navigator.clipboard.writeText(props.text)
  tooltip.value!.className = 'tooltip copied'
  setTimeout(() => {
    tooltip.value!.className = 'tooltip'
  }, 2000)
}
</script>

<style scoped>
.click-to-copy {
  cursor: pointer;
  text-decoration: underline;
  color: #74ae70;
}
.tooltip {
  display: none;
  position: absolute;
  background-color: #74ae70;
  color: #fff;
  padding: 5px;
  border-radius: 4px;
  z-index: 1;
}
.tooltip::after {
  content: "";
  position: absolute;
  top: -10px;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #74ae70 transparent;
}
.tooltip.copied {
  display: block;
}
</style>