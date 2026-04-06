<template>
  <nav ref="navbarRef" class="navbar">
    <div class="navbar-logo">
      <NuxtLink to="/">アジ鯖</NuxtLink>
    </div>

    <button
      class="hamburger-btn"
      type="button"
      aria-controls="mobile-nav-links"
      :aria-expanded="isMobileMenuOpen"
      aria-label="メニューを開閉"
      @click="toggleMobileMenu"
    >
      <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
      <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
      <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
    </button>

    <div id="mobile-nav-links" class="navbar-right" :class="{ 'is-open': isMobileMenuOpen }">
      <ul class="navbar-links" @mouseleave="resetAll()">
        <li class="nav-item nav-parent" v-for="(level1Menu, index) in showMenu" :key="level1Menu.name">
          
          <div class="menu-link-wrapper">
            <NuxtLink :to="level1Menu.to" @mouseover="handleMenuMouseOver(level1Menu)" @click="handleParentClick(level1Menu)" exact>
              {{ level1Menu.name }}
            </NuxtLink>
            
            <button
              v-if="level1Menu.menu"
              class="mobile-toggle-icon"
              type="button"
              :aria-controls="`submenu-${index}`"
              :aria-expanded="level1Menu.show_menu"
              :aria-label="`${level1Menu.name}のサブメニューを開閉`"
              @click.stop.prevent="toggleSubMenu(level1Menu)"
            >
              <span class="arrow" :class="{ 'is-open': level1Menu.show_menu }">▼</span>
            </button>
          </div>

          <ul
            v-if="level1Menu.menu"
            :id="`submenu-${index}`"
            class="dropdown-menu"
            :class="{ 'is-submenu-open': level1Menu.show_menu }"
          >
            <li v-for="item in level1Menu.menu" :key="item.name">
              <NuxtLink :to="item.to" @click="closeMobileMenu" exact>{{ item.name }}</NuxtLink>
            </li>
          </ul>

        </li>
      </ul>
      <ToggleColorMode class="toggle-color-mode" />
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import ToggleColorMode from "~/components/ToggleColorMode.vue";

const MOBILE_BREAKPOINT = 768
const route = useRoute()

const navbarRef = ref(null)
const isMobileMenuOpen = ref(false)
const previousBodyOverflow = ref(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const resetAll = () => {
  showMenu.value.forEach(item => {
    item.show_menu = false
  })
}

const toggleSubMenu = (item) => {
  item.show_menu = !item.show_menu
}

const handleMenuMouseOver = (item) => {
  if (typeof window !== 'undefined' && window.innerWidth > MOBILE_BREAKPOINT) {
    resetAll()
    item.show_menu = true
  }
}

const handleResize = () => {
  if (typeof window === 'undefined') {
    return
  }
  resetAll()
  if (window.innerWidth > MOBILE_BREAKPOINT) {
    closeMobileMenu()
  }
}

const handleParentClick = (item) => {
  if (!item.menu) {
    closeMobileMenu()
  }
}

const handleDocumentClick = (event) => {
  if (!isMobileMenuOpen.value || !navbarRef.value) {
    return
  }
  if (!navbarRef.value.contains(event.target)) {
    closeMobileMenu()
  }
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

watch(() => route.fullPath, () => {
  closeMobileMenu()
})

watch(isMobileMenuOpen, (isOpen) => {
  if (typeof document === 'undefined') {
    return
  }
  if (isOpen) {
    if (previousBodyOverflow.value === null) {
      previousBodyOverflow.value = document.body.style.overflow
    }
    document.body.style.overflow = 'hidden'
  } else if (previousBodyOverflow.value !== null) {
    document.body.style.overflow = previousBodyOverflow.value
    previousBodyOverflow.value = null
  }
  if (!isOpen) {
    resetAll()
  }
})

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
  if (previousBodyOverflow.value !== null) {
    document.body.style.overflow = previousBodyOverflow.value
    previousBodyOverflow.value = null
  }
})

const rules = ref([
  {name: "利用規約", showChildren: false, to: "/rules/terms"},
  {name: "Minecraftサーバ個別規定", showChildren: false, to: "/rules/minecraft-server-policy"},
  {name: "全体サーバールール", showChildren: false, to: "/rules/global-server-rules"},
  {name: "各サーバールール", showChildren: false, to: "/rules/server-rules"},
  {name: "Discordルール", showChildren: false, to: "/rules/discord"},
  {name: "チャットガイドライン", showChildren: false, to: "/rules/chat-guidelines"},
  {name: "運営登用規約", showChildren: false, to: "/rules/operating-terms-and-conditions"},
  {name: "二次創作ガイドライン", showChildren: false, to: "/rules/derivative-works-guidelines"},
])

const connect = ref([
  {name: "接続方法", showChildren: false, to: "/connect"},
  {name: "接続アドレス", showChildren: false, to: "/connect/addresses"},
])

const donation = ref([
  {name: "寄付ページ", showChildren: false, to: "https://store.azisaba.net/"},
  {name: "寄付に関する注意事項", showChildren: false, to: "/donation/note"},
  {name: "寄付金利用方法について", showChildren: false, to: "/donation/usage"},
  {name: "特定商取引法に基づく表記", showChildren: false, to: "/donation/commercial-transactions"},
])

const other = ref([
  {name: "サポート", showChildren: false, to: "/support"},
  {name: "投票サイト", showChildren: false, to: "/links#投票サイト"},
  {name: "リンク", showChildren: false, to: "/links"},
])

const showMenu = ref([
  {name: "ホーム", show_menu: false, to: "/"},
  {name: "お知らせ", show_menu: false, to: "/news"},
  {name: "接続する", menu: connect, show_menu: false, to: "/connect"},
  {name: "ルール", menu: rules, show_menu: false, to: "/rules"},
  {name: "サーバー紹介", show_menu: false, to: "/servers"},
  {name: "寄付", menu: donation, show_menu: false, to: "/donation"},
  {name: "開発ブログ(仮)", show_menu: false, to: "/devlog"},
  {name: "求人", show_menu: false, to: "/recruit"},
  {name: "その他", menu: other, show_menu: false, to: "#"},
])

</script>

<style scoped>
.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  z-index: 1000;
  box-sizing: border-box;
}

.navbar-logo a {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
}

.navbar-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  position: relative;
}

.navbar-links li a {
  color: white;
  text-decoration: none;
}

.navbar-links li a:hover {
  text-decoration: underline;
}

.dropdown-menu {
  text-align: center;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #444;
  list-style: none;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  white-space: nowrap; 
  display: none;
  z-index: 1001;
}

.dropdown-menu li {
  margin: 0;
  padding: 0.5rem 0;
}

.dropdown-menu li a {
  color: white;
  text-decoration: none;
}

.dropdown-menu li a:hover {
  text-decoration: underline;
}

.navbar-right {
  display: flex;
}

.toggle-color-mode {
  margin-left: 15px;
}

.nav-item {
  top: 7px;
}

.mobile-toggle-icon {
  display: none;
  border: 0;
  background: transparent;
  color: inherit;
}

.hamburger-btn {
  display: none;
}

@media (min-width: 769px) {
  .nav-parent:hover .dropdown-menu {
    display: block;
    right: 0;
    left: auto;
    width: auto;
    min-width: 70px;
  }
}

@media (max-width: 768px) {
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

  .hamburger-line.is-active:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  .hamburger-line.is-active:nth-child(2) { opacity: 0; }
  .hamburger-line.is-active:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

  .navbar-right {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #333;
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 0;
    display: none;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  }

  .navbar-right.is-open {
    display: flex;
  }

  .navbar-links {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  .menu-link-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0;
    border-bottom: 1px solid #555;
  }

  .mobile-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .arrow {
    font-size: 0.8rem;
    color: white;
    transition: transform 0.3s ease;
  }
  .arrow.is-open {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: static;
    background-color: transparent;
    width: 100%;
    padding: 0;
    margin-top: 0;
    white-space: normal;
  }

  .dropdown-menu.is-submenu-open {
    display: block;
  }

  .dropdown-menu li {
    padding: 0;
  }

  .dropdown-menu li a {
    display: block;
    padding: 0.8rem 1rem 0.8rem 3rem;
    font-size: 0.9rem;
    color: #ccc;
    text-align: left;
  }

  .toggle-color-mode {
    margin: 2rem auto;
  }

  .nav-item {
    top: 0;
  }
}
</style>