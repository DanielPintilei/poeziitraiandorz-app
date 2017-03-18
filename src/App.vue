<template>
  <div id="app" class="app" :style="{color: currentTheme.textColor, backgroundColor: currentTheme.backgroundColor, borderColor: currentTheme.borderColor}">
    <sidebar-left v-show="sidebarLeftShow"></sidebar-left>
    <main class="main">
      <navbar></navbar>
      <router-view></router-view>
    </main>
    <sidebar-right v-show="sidebarRightShow" :themeIconColor="currentTheme.iconColor2"></sidebar-right>
  </div>
</template>

<script>
import Firebase from 'firebase'

import { store } from './store/index'

import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'

let app = Firebase.initializeApp({databaseURL: 'https://poeziitraiandorz.firebaseio.com'})
let db = app.database()
let themesRef = db.ref('themes')

export default {
  name: 'app',
  firebase: {
    themesRef
  },
  mounted () {
    let setThemesOnLoad = () => store.commit('setLoadedThemes', this.themesRef)
    setTimeout(() => {
      setThemesOnLoad()
    }, 1000)
  },
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
  border: 10px solid;
}
.main {
  flex-grow: 1;
}
.icon-themed:hover {
  cursor: pointer;
  opacity: 0.7;
}
</style>
