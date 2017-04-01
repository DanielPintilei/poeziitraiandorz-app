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
    <main
      :style="{ backgroundColor: currentTheme.backgroundColor2 }"
      class="app__main">
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
        :caieteRef="caieteRef"
        v-show="sidebarRightShow">
      </sidebar-right>
    </transition>
  </div>
</template>

<script>
import Firebase from 'firebase'
// import Poezii from './poezii.json'

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
  store,
  components: {
    Navbar,
    SidebarLeft,
    SidebarRight
  },
  data () {
    return {
      // caieteRef: Poezii.caiete,
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
          backgroundColor: '#212121',
          backgroundColor2: '#292929',
          backdropColor: '#212121',
          navbarColor: '#212121',
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

a
  color currentColor
  display block
  -webkit-text-decoration-skip objects

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
  background-color $scrollbarTrackBackground
::-webkit-scrollbar-thumb
  background-color $scrollbarThumbBackground

.app
  position relative
  display flex
  width 100vw
  height 100vh
  border 3px solid
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
  @media (min-width $breakpointMobile)
    display none

.app__main
  position relative
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

.sidebar-slide-left-enter-active
  @media (max-width $breakpointMobileDown)
    animation slide-left-in $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile)
    animation width-left-in $sidebarDuration $sidebarTiming
.sidebar-slide-left-leave-active
  @media (max-width $breakpointMobileDown)
    animation slide-left-out $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile)
    animation width-left-out $sidebarDuration $sidebarTiming
@keyframes width-left-in
  from
    width 0
  to
    width $sidebarLeftWidth
@keyframes width-left-out
  from
    width $sidebarLeftWidth
  to
    width 0
@keyframes slide-left-in
  from
    transform translateX(- $sidebarLeftWidth)
  to
    transform translateX(0)
@keyframes slide-left-out
  from
    transform translateX(0)
  to
    transform translateX(- $sidebarLeftWidth)

.sidebar-slide-right-enter-active
  @media (max-width $breakpointMobileDown)
    animation slide-right-in $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile)
    animation width-right-in $sidebarDuration $sidebarTiming
.sidebar-slide-right-leave-active
  @media (max-width $breakpointMobileDown)
    animation slide-right-out $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile)
    animation width-right-out $sidebarDuration $sidebarTiming
@keyframes width-right-in
  from
    width 0
  to
    width $sidebarRightWidth
@keyframes width-right-out
  from
    width $sidebarRightWidth
  to
    width 0
@keyframes slide-right-in
  from
    transform translateX($sidebarRightWidth)
  to
    transform translateX(0)
@keyframes slide-right-out
  from
    transform translateX(0)
  to
    transform translateX($sidebarRightWidth)

</style>
