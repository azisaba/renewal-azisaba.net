<template>
        <ul class="top-ul">
            <li v-for="top_menu in menus" @mouseover="open_menu_name = top_menu.name"
                @mouseleave="open_menu_name = null" class="top-li">
                    <NuxtLink :to="top_menu.to" class="top-link">
                        {{ top_menu.name }}
                    </NuxtLink>
                <ul v-show="open_menu_name == top_menu.name && top_menu.menu" class="second-ul">
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
        height: 100%;
    }

    .top-li {
        /* ① サブメニューの基準点にする */
        position: relative;
        color: aliceblue;
        height: 100%;
        
        z-index: 10;
    }

    .top-link {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0 10px;
        text-decoration: none;
        color: inherit;
        height: 100%;
    }

    .top-link:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .second-ul {
        position: absolute;
        top: 100%;
        left: 0;

        min-width: 100%;
        white-space: nowrap;

        list-style: none;
        background-color: rgb(68, 68, 68);
        border-top: 4px solid #4a9bf2;;
        color: aliceblue;
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
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>