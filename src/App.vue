<template>
  <div id="app" class="app" :style="{color: currentTheme.color, backgroundColor: currentTheme.backgroundColor}">
    <sidebar-left v-show="sidebarLeftShow" :themeIconColor="currentTheme.iconColor"></sidebar-left>
    <main class="main">
      <navbar :themeIconColor="currentTheme.iconColor"></navbar>
      <router-view></router-view>
    </main>
    <sidebar-right v-show="sidebarRightShow" :themeIconColor="currentTheme.iconColor"></sidebar-right>
  </div>
</template>

<script>
import { store } from './store/index'

import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'

export default {
  name: 'app',
  store,
  components: {
    Navbar,
    SidebarLeft,
    SidebarRight
  },
  data () {
    return {
    }
  },
  computed: {
    sidebarLeftShow () {
      return store.getters.getSidebarLeftToggled
    },
    sidebarRightShow () {
      return store.getters.getSidebarRightToggled
    },
    currentTheme () {
      return store.getters.getCurrentTheme
    }
  },
  methods: {
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}
.app {
  display: flex;
  width: 100vw;
  height: 100vh;
  // border: 10px solid currentColor;
}
.main {
  flex-grow: 1;
  transition: all 2s;
}
.icon-themed:hover {
  cursor: pointer;
  opacity: 0.7;
}
</style>
