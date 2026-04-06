<template>
  <nav ref="navbarRef" class="navbar" :class="{ 'is-compact': isCompactMenu, 'is-measuring': isMeasuring }">
    <div ref="navbarLogoRef" class="navbar-logo">
      <NuxtLink to="/">アジ鯖</NuxtLink>
    </div>

    <button
      type="button"
      class="hamburger-btn"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="global-navigation"
      aria-label="メニューの開閉"
      @click="toggleMobileMenu"
    >
      <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
      <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
      <span class="hamburger-line" :class="{ 'is-active': isMobileMenuOpen }"></span>
    </button>

    <div id="global-navigation" ref="navbarRightRef" class="navbar-right" :class="{ 'is-open': isMobileMenuOpen }">
      <ul class="navbar-links" @mouseleave="resetAll()">
        <li class="nav-item nav-parent" v-for="level1Menu in showMenu" :key="level1Menu.name">
          
          <div class="menu-link-wrapper">
            <NuxtLink
              :to="level1Menu.to"
              @mouseover="menuMouseOver(level1Menu)"
              @click="handleParentClick(level1Menu, $event)"
            >
              {{ level1Menu.name }}
            </NuxtLink>
            
            <span v-if="level1Menu.menu" class="mobile-toggle-icon" @click.stop.prevent="toggleSubMenu(level1Menu)">
              <span class="arrow" :class="{ 'is-open': level1Menu.show_menu }">▼</span>
            </span>
          </div>

          <ul v-if="level1Menu.menu" class="dropdown-menu" :class="{ 'is-submenu-open': level1Menu.show_menu }">
            <li v-for="item in level1Menu.menu" :key="item.name">
              <NuxtLink :to="item.to" @click="closeMobileMenu">{{ item.name }}</NuxtLink>
            </li>
          </ul>

        </li>
      </ul>
      <ToggleColorMode class="toggle-color-mode" />
    </div>
  </nav>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ToggleColorMode from "~/components/ToggleColorMode.vue";

const MOBILE_BREAKPOINT = 640
const COMPACT_THRESHOLD_PX = 4
const isMobileMenuOpen = ref(false)
const isCompactMenu = ref(false)
const isMeasuring = ref(false)
const navbarRef = ref(null)
const navbarLogoRef = ref(null)
const navbarRightRef = ref(null)
let isUpdatingMenuMode = false
let resizeObserver = null

const toggleMobileMenu = () => {
  if (!isCompactMenu.value) {
    return
  }

  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    resetAll()
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  resetAll()
}

const resetAll = () => {
  showMenu.value.forEach(item => {
    item.show_menu = false;
  });
}

const isSmallMobile = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.innerWidth <= MOBILE_BREAKPOINT
}

const shouldUseCompactMenuByOverflow = () => {
  const navbar = navbarRef.value
  const logo = navbarLogoRef.value
  const right = navbarRightRef.value

  if (!navbar || !logo || !right) {
    return false
  }

  const navbarInnerWidth = navbar.clientWidth
  const logoWidth = logo.getBoundingClientRect().width
  const rightWidth = right.scrollWidth
  const horizontalGap = 32
  const requiredWidth = logoWidth + rightWidth + horizontalGap

  const logoLink = logo.querySelector('a')
  const hasWrappedLogoText = (() => {
    if (!logoLink) {
      return false
    }

    const computedStyle = window.getComputedStyle(logoLink)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight)
    if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
      return false
    }

    return logoLink.getBoundingClientRect().height > (lineHeight + 1)
  })()

  if (hasWrappedLogoText) {
    return true
  }

  const topLevelLinks = right.querySelectorAll('.menu-link-wrapper > a')
  const hasWrappedTopLevelText = Array.from(topLevelLinks).some((link) => {
    const computedStyle = window.getComputedStyle(link)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight)
    if (!Number.isFinite(lineHeight) || lineHeight <= 0) {
      return false
    }

    return link.getBoundingClientRect().height > (lineHeight + 1)
  })

  if (hasWrappedTopLevelText) {
    return true
  }

  return requiredWidth > (navbarInnerWidth - COMPACT_THRESHOLD_PX)
}

const updateMenuMode = async () => {
  if (typeof window === 'undefined' || isUpdatingMenuMode) {
    return
  }

  isUpdatingMenuMode = true
  try {
    isMeasuring.value = true
    await nextTick()

    const shouldCompact = isSmallMobile() || shouldUseCompactMenuByOverflow()
    isMeasuring.value = false

    if (!shouldCompact) {
      closeMobileMenu()
    }

    isCompactMenu.value = shouldCompact
  } finally {
    isUpdatingMenuMode = false
  }
}

const toggleSubMenu = (item) => {
  if (!isCompactMenu.value) {
    return
  }

  item.show_menu = !item.show_menu;
}

const menuMouseOver = (item) => {
  if (!isCompactMenu.value) {
    resetAll()
    item.show_menu = true
  }
}

const handleParentClick = (item, event) => {
  if (item.menu && isCompactMenu.value) {
    event.preventDefault()
    toggleSubMenu(item)
    return
  }

  if (!item.menu) {
    closeMobileMenu()
  }
}

const handleResize = () => {
  updateMenuMode()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (typeof ResizeObserver !== 'undefined' && navbarRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateMenuMode()
    })
    resizeObserver.observe(navbarRef.value)
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      updateMenuMode()
    })
  }

  updateMenuMode()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

const rules = [
  {name: "利用規約", showChildren: false, to: "/rules/terms"},
  {name: "Minecraftサーバ個別規定", showChildren: false, to: "/rules/minecraft-server-policy"},
  {name: "全体サーバールール", showChildren: false, to: "/rules/global-server-rules"},
  {name: "各サーバールール", showChildren: false, to: "/rules/server-rules"},
  {name: "Discordルール", showChildren: false, to: "/rules/discord"},
  {name: "チャットガイドライン", showChildren: false, to: "/rules/chat-guidelines"},
  {name: "運営登用規約", showChildren: false, to: "/rules/operating-terms-and-conditions"},
  {name: "二次創作ガイドライン", showChildren: false, to: "/rules/derivative-works-guidelines"},
]

const connect = [
  {name: "接続方法", showChildren: false, to: "/connect"},
  {name: "接続アドレス", showChildren: false, to: "/connect/addresses"},
]

const donation = [
  {name: "寄付ページ", showChildren: false, to: "https://store.azisaba.net/"},
  {name: "寄付に関する注意事項", showChildren: false, to: "/donation/note"},
  {name: "寄付金利用方法について", showChildren: false, to: "/donation/usage"},
  {name: "特定商取引法に基づく表記", showChildren: false, to: "/donation/commercial-transactions"},
]

const other = [
  {name: "サポート", showChildren: false, to: "/support"},
  {name: "投票サイト", showChildren: false, to: "/links#投票サイト"},
  {name: "リンク", showChildren: false, to: "/links"},
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
  {name: "その他", menu: other, show_menu: false, to: "/links"},
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
  display: inline-block;
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  word-break: keep-all;
}

.navbar-logo {
  flex-shrink: 0;
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

.menu-link-wrapper > a {
  white-space: nowrap;
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
  flex-shrink: 0;
}

.mobile-toggle-icon {
  display: none;
}

.hamburger-btn {
  display: none;
}

.navbar:not(.is-compact) .nav-parent:hover .dropdown-menu {
  display: block;
  right: 0;
  left: auto;
  width: auto;
  min-width: 70px;
}

.navbar.is-compact .hamburger-btn {
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

.navbar.is-compact .hamburger-line {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.navbar.is-compact .hamburger-line.is-active:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.navbar.is-compact .hamburger-line.is-active:nth-child(2) { opacity: 0; }
.navbar.is-compact .hamburger-line.is-active:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

.navbar.is-compact .navbar-right {
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

.navbar.is-compact .navbar-right.is-open {
  display: flex;
}

.navbar.is-compact .navbar-links {
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.navbar.is-compact .menu-link-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
  border-bottom: 1px solid #555;
}

.navbar.is-compact .mobile-toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.navbar.is-compact .arrow {
  font-size: 0.8rem;
  color: white;
  transition: transform 0.3s ease;
}

.navbar.is-compact .arrow.is-open {
  transform: rotate(180deg);
}

.navbar.is-compact .dropdown-menu {
  position: static;
  background-color: transparent;
  width: 100%;
  padding: 0;
  margin-top: 0;
  white-space: normal;
}

.navbar.is-compact .dropdown-menu.is-submenu-open {
  display: block;
}

.navbar.is-compact .dropdown-menu li {
  padding: 0;
}

.navbar.is-compact .dropdown-menu li a {
  display: block;
  padding: 0.8rem 1rem 0.8rem 3rem;
  font-size: 0.9rem;
  color: #ccc;
  text-align: left;
}

.navbar.is-compact .toggle-color-mode {
  margin: 2rem auto;
}

.navbar.is-compact .nav-item {
  top: 0;
}

.navbar.is-measuring .hamburger-btn {
  display: none !important;
}

.navbar.is-measuring .navbar-right {
  position: static !important;
  display: flex !important;
  width: auto !important;
  padding: 0 !important;
  box-shadow: none !important;
}

.navbar.is-measuring .navbar-links {
  flex-direction: row !important;
  align-items: center !important;
  width: auto !important;
  padding: 0 !important;
}

.navbar.is-measuring .mobile-toggle-icon {
  display: none !important;
}
</style>