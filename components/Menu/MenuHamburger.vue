<template>
    <button class="hamburger-btn" type="button" aria-controls="mobile-nav-links" :aria-expanded="isOpen"
        aria-label="メニューを開閉" @click="$emit('toggle')">
        <span class="hamburger-line" :class="{ 'is-active': isOpen }"></span>
        <span class="hamburger-line" :class="{ 'is-active': isOpen }"></span>
        <span class="hamburger-line" :class="{ 'is-active': isOpen }"></span>
    </button>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        required: true
    }
})
defineEmits(['toggle'])
</script>

<style scoped>
.hamburger-btn {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1002;
    padding: 0;
}

.hamburger-line {
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s ease;
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