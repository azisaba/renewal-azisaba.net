<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <NuxtLink to="/">アジ鯖</NuxtLink>
    </div>
    <div class="navbar-left-block">
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
      <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="sepia">Sepia</option>
      </select>
    </div>
  </nav>
</template>

<script setup>
import {ref} from 'vue'

const resetAll = () => {
  showMenu.value.forEach(item => {
    item.show_menu = false;
  });
}

const rules = ref([
  {name: "全体サーバールール", showChildren: false, to: "/rules/all-server",},
  {name: "各サーバールール", showChildren: false, to: "/rules/servers",},
  {name: "利用規約", showChildren: false, to: "/rules/terms",},
  {name: "その他のルールなど", showChildren: false, to: "/rules/others",},
])

const connect = ref([
  {name: "接続方法", showChildren: false, to: "/connect",},
  {name: "接続アドレス", showChildren: false, to: "/connect/addresses",},
])

const donation = ref([
  {name: "寄付ページ", showChildren: false, to: "https://azisaba.buycraft.net/",},
  {name: "寄付に関する注意事項", showChildren: false, to: "/donation/note",},
  {name: "特定商取引法に基づく表示", showChildren: false, to: "/donation/commercial-transactions",},
])

const showMenu = ref([
  {name: "ホーム", show_menu: false, to: "/"},
  {name: "お知らせ", show_menu: false, to: "/news"},
  {name: "接続する", menu: connect, show_menu: false, to: "/connect"},
  {name: "ルール", menu: rules, show_menu: false, to: "/rules"},
  {name: "サーバー紹介", show_menu: false, to: "/servers"},
  {name: "寄付", menu: donation, show_menu: false, to: "/donation"},
])

const menu_mouse_over =async (item, event)=>{
  resetAll()
  item.show_menu = true

  /*
  await nextTick()
  const dropdown = event.target.nextElementSibling;

  if (dropdown && false) {
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    console.log(dropdownRect, viewportWidth, dropdownRect.right > viewportWidth)

    // 画面外にはみ出さないように調整
    if (dropdownRect.right > viewportWidth) {
      dropdown.style.left = 'auto';
      dropdown.style.right = '0';
    } else {
      dropdown.style.left = '0';
      dropdown.style.right = 'auto';
    }
  }

   */
}

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

  white-space: nowrap; /* 自動で改行せずに、要素幅に合わせて広がる */
  display: none;
  z-index: 1000; /* ドロップダウンメニューが他の要素の上に表示されるように調整 */
}


.dropdown-menu li {
  margin: 0;
  padding: 0.5rem 0;
}

.nav-parent:hover .dropdown-menu {
  display: block;
  right: 0;
  left: auto;

  width: auto;
  min-width: 70px;
}

.dropdown-menu li a {
  color: white;
  text-decoration: none;
}

.dropdown-menu li a:hover {
  text-decoration: underline;
}

.navbar-left-block {
  display: flex;
  gap: 1.5rem;
}

</style>