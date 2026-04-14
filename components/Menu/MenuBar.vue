<template>
        <ul class="top-ul">
            <li v-for="top_menu in menus" @mouseover="open_menu_name = top_menu.name"
                @mouseleave="open_menu_name = null" class="top-li">
                <div class="second-menu-wapper">
                    <NuxtLink :to="top_menu.to" class="top-link">
                        {{ top_menu.name }}
                    </NuxtLink>
                
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
import { menus } from "~/menu.config"
const open_menu_name = ref<string | null>(null)

const open_second_menu = (manu_name: string)=>{
    open_menu_name.value = manu_name;
}
</script>

<style scoped>
    .top-ul {
        display: flex;
        list-style: none;
        height: 60px;
        background-color: rgb(216, 246, 236);
    }

    .top-li {
        /* ① サブメニューの基準点にする */
        position: relative;
        color: black;
        height: 100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top-link {
        padding: 0 10px;
        height: 100%;
        text-decoration: none;
        color: inherit;
    }

    .second-ul {
        position: absolute;
        top: 100%;
        left: 0;

        min-width: 100%;
        white-space: nowrap;

        list-style: none;
        background-color: rgb(216, 220, 246);
        color: black;
        padding: 0;
        margin: 0;
        z-index: 10;
    }

    .second-link {
        display: block;

        padding: 10px 15px;
        text-decoration: none;
        color: inherit;
    }

    .second-link:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>