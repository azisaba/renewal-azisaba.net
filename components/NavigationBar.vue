<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <NuxtLink to="/">アジ鯖</NuxtLink>
    </div>

    <div class="navbar-right">
      <ul class="navbar-links" @mouseleave="resetAll()">
        <li class="nav-item nav-parent" v-for="level1Menu in showMenu" :key="level1Menu.name">
          <NuxtLink :to=level1Menu.to v-on:mouseover="menu_mouse_over(level1Menu, $event)" exact>{{ level1Menu.name }}</NuxtLink>
          <ul v-if="level1Menu.menu" class="dropdown-menu" v-show="level1Menu.show_menu">
            <li v-for="item in level1Menu.menu" :key="item.name">
              <NuxtLink :to=item.to exact>{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    <ToggleColorMode class="toggle-color-mode" />
    </div>
  </nav>
</template>

<script setup>
import {ref} from 'vue'
import ToggleColorMode from "~/components/ToggleColorMode.vue";

const resetAll = () => {
  showMenu.value.forEach(item => {
    item.show_menu = false
  })
}

const toggleSubMenu = (item) => {
  const nextState = !item.show_menu
  resetAll()
  item.show_menu = nextState
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

const handleParentClick = (item, event) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
  const hasSubMenu = !!item.menu
  const hasRealDestination = !!item.to && item.to !== '#'

  if (isMobile && hasSubMenu && !hasRealDestination) {
    event.preventDefault()
    toggleSubMenu(item)
    return
  }

  if (isMobile) {
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

const rules = [
  {name: "利用規約", to: "/rules/terms"},
  {name: "Minecraftサーバ個別規定", to: "/rules/minecraft-server-policy"},
  {name: "全体サーバールール", to: "/rules/global-server-rules"},
  {name: "各サーバールール", to: "/rules/server-rules"},
  {name: "Discordルール", to: "/rules/discord"},
  {name: "チャットガイドライン", to: "/rules/chat-guidelines"},
  {name: "運営登用規約", to: "/rules/operating-terms-and-conditions"},
  {name: "二次創作ガイドライン", to: "/rules/derivative-works-guidelines"},
]

const connect = [
  {name: "接続方法", to: "/connect"},
  {name: "接続アドレス", to: "/connect/addresses"},
]

const donation = [
  {name: "寄付ページ", to: "https://store.azisaba.net/"},
  {name: "寄付に関する注意事項", to: "/donation/note"},
  {name: "寄付金利用方法について", to: "/donation/usage"},
  {name: "特定商取引法に基づく表記", to: "/donation/commercial-transactions"},
]

const other = [
  {name: "サポート", to: "/support"},
  {name: "投票サイト", to: "/links#投票サイト"},
  {name: "リンク", to: "/links"},
]

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
  left: 0;
  right: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
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
  z-index: 1000; /* ドロップダウンメニューが他の要素の上に表示されるように調整 */
}

.navbar-right {
  display: flex;
}
.toggle-color-mode {
  margin-left: 15px;
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
    max-height: calc(100vh - 100%);
    overflow-y: auto;
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