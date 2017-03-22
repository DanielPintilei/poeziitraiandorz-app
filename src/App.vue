<template>
  <div id="app" class="app" :style="{color: currentTheme.textColor, backgroundColor: currentTheme.backgroundColor, borderColor: currentTheme.borderColor}">
    <sidebar-left :caieteRef="caieteRef" :theme="currentTheme" v-if="sidebarLeftShow"></sidebar-left>
    <main class="main">
      <navbar :theme="currentTheme" :themes="themes"></navbar>
      <router-view :caieteRef="caieteRef" class="main-router-view"></router-view>
    </main>
    <sidebar-right :theme="currentTheme" v-if="sidebarRightShow"></sidebar-right>
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
let caieteRef = db.ref('caiete')

export default {
  name: 'app',
  firebase: {
    caieteRef
  },
  // mounted: function () {
  //   db.ref('themes').once('value', snapshot => {
  //     this.themes = this.themesRef
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
      themes: [
        {
          accentColor: '#dcbf8c',
          textColor: '#000',
          borderColor: '#dcbf8c',
          backgroundColor: '#fff',
          backgroundColor2: '#fff',
          navbarColor: '#fff',
          logoColor: '#dcbf8c',
          iconColor: '#000'
        },
        {
          accentColor: '#424242',
          textColor: '#fff',
          borderColor: '#dcbf8c',
          borderColor2: '#dcbf8c',
          backgroundColor: '#424242',
          backgroundColor2: '#424242',
          navbarColor: '#424242',
          logoColor: '#fff',
          iconColor: '#fff'
        },
        {
          accentColor: '#FDD835',
          textColor: '#fff',
          borderColor: '#FBC02D',
          backgroundColor: '#FFEB3B',
          backgroundColor2: '#FDD835',
          navbarColor: '#424242',
          logoColor: '#fff',
          iconColor: '#fff'
        },
        {
          accentColor: '#1A237E',
          textColor: '#000',
          borderColor: '#303F9F',
          borderColor2: '#ccc',
          backgroundColor: '#3F51B5',
          backgroundColor2: '#303F9F',
          navbarColor: '#fff',
          logoColor: '#000',
          iconColor: '#000'
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
.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.main-router-view {
  flex-grow: 1;
  /*background-color: aqua;*/
}
.icon-themed:hover {
  cursor: pointer;
  opacity: 0.7;
}
a {
  color: lightgray;
  display: block;
}
</style>
