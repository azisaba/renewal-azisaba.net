<template>
  <button
    aria-controls="mobile-nav-links"
    aria-label="メニューを開閉"
    type="button"
    class="hamburger-btn"
    :aria-expanded="isOpen"
    @click="$emit('toggle')"
  >
    <span class="hamburger-line" :class="{ 'is-active': isOpen }" />
    <span class="hamburger-line" :class="{ 'is-active': isOpen }" />
    <span class="hamburger-line" :class="{ 'is-active': isOpen }" />
  </button>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["toggle"]);
</script>

<style scoped>
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1002;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0;
  width: 30px;
  height: 20px;
}

.hamburger-line {
  transition: all 0.3s ease;
  border-radius: 2px;
  background-color: white;
  width: 100%;
  height: 3px;
}

.hamburger-line.is-active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-line.is-active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.is-active:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
</style>
