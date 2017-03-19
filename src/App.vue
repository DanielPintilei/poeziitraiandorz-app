<template>
  <div id="app" class="app" :class="{loading: loading}" :style="{color: currentTheme.textColor, backgroundColor: currentTheme.backgroundColor, borderColor: currentTheme.borderColor}">
    <sidebar-left :theme="currentTheme" v-show="sidebarLeftShow"></sidebar-left>
    <main class="main">
      <navbar :theme="currentTheme" :themes="themes"></navbar>
      <router-view></router-view>
    </main>
    <sidebar-right :theme="currentTheme" v-show="sidebarRightShow"></sidebar-right>
  </div>
</template>

<script>
// import Firebase from 'firebase'

import { store } from './store/index'

import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'

// let app = Firebase.initializeApp({databaseURL: 'https://poeziitraiandorz.firebaseio.com'})
// let db = app.database()
// let themesRef = db.ref('themes')

export default {
  name: 'app',
  // firebase: {
  //   themesRef
  // },
  // mounted: function () {
  //   db.ref('themes').once('value', snapshot => {
  //     this.themes = this.themesRef
  //     this.loading = false
  //   })
  // },
  store,
  components: {
    Navbar,
    SidebarLeft,
    SidebarRight
  },
  data () {
    return {
      loading: true,
      themes: [
        {
          'backgroundColor': '#fff',
          'borderColor': '#dcbf8c',
          'iconColor': '#000',
          'iconColor2': '#ccc',
          'logoColor': '#dcbf8c',
          'navbarColor': '#fff',
          'textColor': '#000',
          'themeColor': '#dcbf8c'
        },
        {
          'backgroundColor': '#303030',
          'borderColor': '#707070',
          'iconColor': '#fff',
          'iconColor2': '#ccc',
          'logoColor': '#fff',
          'navbarColor': '#303030',
          'textColor': '#FFECB3',
          'themeColor': '#707070'
        }
      ]
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
      return this.themes[store.getters.getCurrentTheme]
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
  border: 7px solid;
}
.loading {
  // opacity: 0;
}
.main {
  flex-grow: 1;
}
.icon-themed:hover {
  cursor: pointer;
  opacity: 0.7;
}
</style>
