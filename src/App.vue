<template>
  <div id="app" class="app" :style="{color: themeColor, backgroundColor: themeBackgroundColor}">
    <sidebar-left v-show="sidebarLeftShow" :themeIconColor="themeIconColor"></sidebar-left>
    <main class="main">
      <navbar :themeIconColor="themeIconColor"></navbar>
      <router-view></router-view>
    </main>
    <sidebar-right v-show="sidebarRightShow"></sidebar-right>
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
      themeColor: store.state.themeColor,
      themeBackgroundColor: store.state.themeBackgroundColor,
      themeIconColor: store.state.themeIconColor
    }
  },
  computed: {
    sidebarLeftShow () {
      return store.getters.getSidebarLeftToggled
    },
    sidebarRightShow () {
      return store.getters.getSidebarRightToggled
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
  border: 10px solid currentColor;
}
.main {
  flex-grow: 1;
}
</style>
