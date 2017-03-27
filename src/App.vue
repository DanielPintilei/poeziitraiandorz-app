<template>
  <div
    id="app"
    class="app"
    :style="{
      color: currentTheme.textColor,
      backgroundColor: currentTheme.backgroundColor,
      borderColor: currentTheme.borderColor
    }">
    <div
      @click="closeSidebars"
      v-if="sidebarLeftShow || sidebarRightShow"
      :style="{ backgroundColor: currentTheme.backdropColor }"
      class="backdrop backdrop--sidebar">
    </div>
    <transition name="sidebar-slide-left">
      <sidebar-left
        :caieteRef="caieteRef"
        :theme="currentTheme"
        v-show="sidebarLeftShow">
      </sidebar-left>
    </transition>
    <main class="app__main">
      <navbar :theme="currentTheme" :themes="themes"></navbar>
      <router-view
        :theme="currentTheme"
        :caieteRef="caieteRef"
        class="app__main-view">
      </router-view>
    </main>
    <transition name="sidebar-slide-right">
      <sidebar-right
        :theme="currentTheme"
        v-show="sidebarRightShow">
      </sidebar-right>
    </transition>
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
          textColor2: '#000',
          borderColor: '#dcbf8c',
          backgroundColor: '#fff',
          backgroundColor2: '#fff',
          backdropColor: '#fff',
          navbarColor: '#fff',
          logoColor: '#dcbf8c',
          iconColor: '#000'
        },
        {
          accentColor: '#dcbf8c',
          textColor: '#fff',
          textColor2: '#dedede',
          borderColor: '#dcbf8c',
          borderColor2: '#675d4c',
          backgroundColor: '#424242',
          backgroundColor2: '#424242',
          backdropColor: '#212121',
          navbarColor: '#424242',
          logoColor: '#fff',
          iconColor: '#fff'
        },
        {
          accentColor: '#FDD835',
          textColor: '#fff',
          textColor2: '#fff',
          borderColor: '#FBC02D',
          backgroundColor: '#FFEB3B',
          backgroundColor2: '#FDD835',
          backdropColor: '#FDD835',
          navbarColor: '#424242',
          logoColor: '#fff',
          iconColor: '#fff'
        },
        {
          accentColor: '#1A237E',
          textColor: '#000',
          textColor2: '#000',
          borderColor: '#303F9F',
          borderColor2: '#ccc',
          backgroundColor: '#3F51B5',
          backgroundColor2: '#303F9F',
          backdropColor: '#303F9F',
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
    closeSidebars () {
      store.commit('closeSidebars')
    }
  }
}
</script>

<style lang="stylus">
@import "variables"

*
  box-sizing border-box

body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  -ms-text-size-adjust 100%
  -webkit-text-size-adjust 100%
  margin 0
  user-select none

::-webkit-scrollbar
  width: 8px
  background-color transparent
::-webkit-scrollbar-track
  background-color $scrollbarTrackBackground
::-webkit-scrollbar-thumb
  background-color $scrollbarThumbBackground
  border-radius 4px

.app
  position relative
  display flex
  width 100vw
  height 100vh
  border 7px solid
  overflow hidden

.backdrop
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  opacity 0.8
  z-index 10

.backdrop--sidebar
  @media (min-width $breakpointMobile + 1px)
    display none

.app__main
  flex-grow 1
  display flex
  flex-direction column

.app__main-view
  flex-grow 1

.icon
  cursor pointer
  opacity $iconOpacity
  &:active
    transform scale(0.9)
  &:hover
    opacity 1

h1
  margin 0 0 1em
  font-family 'Playfair Display', serif
  font-size 2em
  font-weight normal

pre
  margin 0 0 2em
  font-family 'Libre Baskerville', serif
  font-size 1em
  white-space pre-wrap

a
  color currentColor
  display block
  -webkit-text-decoration-skip objects

.sidebar-slide-left-enter-active
  animation width-left-in $sidebarDuration $sidebarTiming
.sidebar-slide-left-leave-active
  animation width-left-out $sidebarDuration $sidebarTiming
@keyframes width-left-in
  0%
    width 0
  100%
    width $sidebarLeftWidth
@keyframes width-left-out
  0%
    width $sidebarLeftWidth
  100%
    width 0

.sidebar-slide-right-enter-active
  animation width-right-in $sidebarDuration $sidebarTiming
.sidebar-slide-right-leave-active
  animation width-right-out $sidebarDuration $sidebarTiming
@keyframes width-right-in
  0%
    width 0
  100%
    width $sidebarRighttWidth
@keyframes width-right-out
  0%
    width $sidebarRightWidth
  100%
    width 0

</style>
