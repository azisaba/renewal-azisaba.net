<template>
  <div class="tooltip" ref="tooltip">コピーしました！</div>
  <span class="click-to-copy" @click="copyText" title="クリックでコピー">
    {{ props.text }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{ text: string }>();
const tooltip = ref<HTMLElement>();

const copyText = () => {
  navigator.clipboard.writeText(props.text);
  tooltip.value!.className = "tooltip copied";
  setTimeout(() => {
    tooltip.value!.className = "tooltip";
  }, 2000);
};
</script>

<style scoped>
.click-to-copy {
  cursor: pointer;
  color: #74ae70;
  text-decoration: underline;
}
.tooltip {
  display: none;
  position: absolute;
  z-index: 1;
  border-radius: 4px;
  background-color: #74ae70;
  padding: 5px;
  color: #fff;
}
.tooltip::after {
  position: absolute;
  top: -10px;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #74ae70 transparent;
  content: "";
}
.tooltip.copied {
  display: block;
}
</style>
