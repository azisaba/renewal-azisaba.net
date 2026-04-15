<template>
    <ul v-if="is_open_mobile_menu" class="top-ul">
        <li v-for="top_menu in menus" class="top-li">
            <div class="second-menu-wapper">

                <NuxtLink :to="top_menu.to" class="top-link">
                    {{ top_menu.name }}
                </NuxtLink>

                <button v-if="top_menu.menu" class="mobile-toggle-icon" type="button" aria-haspopup="true"
                    :aria-expanded="is_open_second_menu" :aria-label="`${top_menu.name}のサブメニューを開閉`"
                    @click="open_second_menu(top_menu.name)">
                    <span class="arrow" :class="{ 'is-open': is_open_second_menu }">▼</span>
                </button>

            </div>
            <ul v-if="open_menu_name == top_menu.name" class="second-ul">
                <li v-for="second_menu in top_menu.menu" class="second-li">
                    <NuxtLink :to="second_menu.to" class="second-link">{{ second_menu.name }}</NuxtLink>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup lang="ts">
const props =　defineProps({
    is_open_mobile_menu: {
        type: Boolean,
        required: true
    }
})
import { menus } from "~/menu.config"
const open_menu_name = ref<string | null>(null)
const is_open_second_menu = ref(false)

const open_second_menu = (menu_name: string) => {
    if (open_menu_name.value === menu_name) {
        open_menu_name.value = null;
        is_open_second_menu.value = false;
    } else {
        open_menu_name.value = menu_name;
        is_open_second_menu.value = true;
    }
}

watch(() => props.is_open_mobile_menu, (is_open) => {
    if (!is_open) {
        open_menu_name.value = null
        is_open_second_menu.value = false
    }
})

</script>

<style scoped>
.top-ul {
    display: block;
    position: fixed;
    top: 4rem;
    right: 0;
    bottom: 0;

    /* --- 追加部分 --- */
    overflow-y: auto;           /* 縦方向に溢れたらスクロールさせる */
    overflow-x: hidden;         /* 横スクロールは出さない */
    overscroll-behavior: contain; /* メニューの端でスクロールが止まるようにする（親要素への伝播防止） */
    scrollbar-gutter: stable; /* スクロールバーの領域を最初から確保しておく */
    /* ---------------- */

    list-style: none;
    height: inherit;
    width: 300px;
    max-width: 100%;
    background-color: rgb(68, 68, 68);
    z-index: 80;
}

.top-li {
    display: block;
}

.second-menu-wapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: auto;
    padding: 0.5rem 0;
    border-bottom: 2px solid #555;
}

.mobile-toggle-icon {
    padding: 10px 10px;
}

.top-link {
    display: block;
    padding: 0.5rem 0.5rem;
    
    text-decoration: none;
    color: inherit;
}

.second-ul {
    list-style: none;
    background-color: rgb(91, 91, 91);
    color: aliceblue;
}

.second-link {
    padding: 0.5rem 1.5rem;
    display: block;

    text-decoration: none;
    color: inherit;
}
</style>
