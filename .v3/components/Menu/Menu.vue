<template>
  <nav class="nav-container" ref="nav_ref">
    <div class="menu-container" :class="{ 'is-mobile-open': is_open_mobile_menu }">
      <ul class="top-ul">
        <li
          class="top-li"
          :key="top_menu.name"
          @mouseenter="on_mouse_enter(top_menu.name)"
          @mouseleave="on_mouse_leave"
          v-for="top_menu in menus"
        >
          <div class="menu-link-wrapper">
            <NuxtLink class="top-link" :to="top_menu.to" @click="$emit('close')">
              {{ top_menu.name }}
            </NuxtLink>

            <button
              aria-haspopup="true"
              type="button"
              class="toggle-icon"
              :aria-expanded="open_menu_name === top_menu.name"
              :aria-label="`${top_menu.name}のサブメニューを開閉`"
              @click.prevent="toggle_open_second_menu(top_menu.name)"
              v-if="top_menu.menu"
            >
              <span class="arrow" :class="{ 'is-open': open_menu_name === top_menu.name }">▼</span>
            </button>
          </div>

          <ul class="second-ul" v-show="open_menu_name === top_menu.name && top_menu.menu">
            <li class="second-li" :key="second_menu.name" v-for="second_menu in top_menu.menu">
              <NuxtLink class="second-link" :to="second_menu.to" @click="$emit('close')">
                {{ second_menu.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <MenuHamburger
      class="menu-hamburger"
      :is-open="is_open_mobile_menu"
      @toggle="toggle_open_mobile_menu"
    />
  </nav>
</template>

<script lang="ts" setup>
import { menus } from "~/menu.config";

const MOBILE_BREAKPOINT_WINDOW_WIDTH = 800;

const is_open_mobile_menu = ref(false);
const open_menu_name = ref<string | null>(null);

const nav_ref = ref<HTMLElement | null>(null);
const route = useRoute();

const toggle_open_second_menu = (menu_name: string) => {
  open_menu_name.value = open_menu_name.value === menu_name ? null : menu_name;
};

const toggle_open_mobile_menu = () => {
  is_open_mobile_menu.value = !is_open_mobile_menu.value;
};

const on_mouse_enter = (menu_name: string) => {
  if (typeof window !== "undefined" && window.innerWidth > MOBILE_BREAKPOINT_WINDOW_WIDTH) {
    open_menu_name.value = menu_name;
  }
};

const on_mouse_leave = () => {
  if (typeof window !== "undefined" && window.innerWidth > MOBILE_BREAKPOINT_WINDOW_WIDTH) {
    open_menu_name.value = null;
  }
};

watch(
  () => route.fullPath,
  () => {
    is_open_mobile_menu.value = false;
  },
);

watch(is_open_mobile_menu, (is_open) => {
  if (!is_open) {
    open_menu_name.value = null;
  }
});

const handle_display_click = (event: MouseEvent) => {
  if (is_open_mobile_menu.value && nav_ref.value) {
    if (!nav_ref.value.contains(event.target as Node)) {
      is_open_mobile_menu.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handle_display_click);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handle_display_click);
});
</script>

<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.top-ul,
.second-ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.top-link,
.second-link {
  color: inherit;
  text-decoration: none;
}

.toggle-icon {
  cursor: pointer;
  border: none;
  background: transparent;
  color: inherit;
}

.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
  font-size: 0.8em;
}

.arrow.is-open {
  transform: rotate(180deg);
}

@media (min-width: 801px) {
  .menu-container {
    display: block !important;
    height: 100%;
  }

  .menu-hamburger {
    display: none;
  }

  .top-ul {
    display: flex;
    height: 100%;
  }

  .top-li {
    position: relative;
    z-index: 10;
    padding: 0 4px;
    height: 100%;
    color: aliceblue;
  }

  .menu-link-wrapper {
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    height: 100%;
  }

  .top-li:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .top-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 5px 0 5px;

    height: 100%;
  }

  .toggle-icon {
    display: flex;
    align-items: center;
    padding: 0 5px 0 0;
    height: 100%;
  }

  .second-ul {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    border-top: 4px solid #4a9bf2;
    background-color: rgb(68, 68, 68);
    min-width: 100%;
    color: aliceblue;
    white-space: nowrap;
  }

  .second-link {
    display: block;
    padding: 10px 15px;
  }

  .second-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 800px) {
  .menu-container {
    display: none;
    position: fixed;
    top: 4rem;
    right: 0;
    bottom: 0;
    z-index: 80;
    border-left: 4px solid #717171;
    background-color: rgb(68, 68, 68);
    width: 300px;
    max-width: 100%;
    overflow-x: hidden;

    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
  }

  .menu-container.is-mobile-open {
    display: block;
  }

  .top-ul,
  .top-li {
    display: block;
  }

  .menu-link-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #555;
    color: aliceblue;
  }

  .top-link {
    display: block;
    flex-grow: 1;
    padding: 1rem 1rem;
  }

  .toggle-icon {
    padding: 1rem 1.5rem;
  }

  .second-ul {
    background-color: rgb(91, 91, 91);
    color: aliceblue;
  }

  .second-link {
    display: block;
    padding: 0.8rem 2rem;
  }
}
</style>
