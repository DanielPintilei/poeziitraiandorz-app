<template>
  <div
    id="app"
    class="app"
    :style="{
      color: currentTheme.text,
      backgroundColor: currentTheme.background,
      borderColor: currentTheme.border
    }">
    <transition name="backdrop">
      <div
        @click="closeSidebars"
        v-if="sidebarLeftShow || sidebarRightShow"
        :style="{ backgroundColor: currentTheme.backdrop }"
        class="backdrop backdrop--sidebar">
      </div>
    </transition>
    <transition name="sidebar-slide-left">
      <sidebar-left
        :cuprinsCaieteRef="cuprinsCaieteRef"
        :cuprinsPoeziiRef="cuprinsPoeziiRef"
        :theme="currentTheme"
        v-show="sidebarLeftShow">
      </sidebar-left>
    </transition>
    <main
      :style="{ backgroundColor: currentTheme.background2 }"
      class="app__main">
      <navbar :theme="currentTheme" :themes="themes"></navbar>
      <transition name="router-view" mode="out-in">
        <router-view
          :theme="currentTheme"
          :poeziiRef="poeziiRef"
          class="app__main-view">
        </router-view>
      </transition>
    </main>
    <transition name="sidebar-slide-right">
      <sidebar-right
        :theme="currentTheme"
        :cuprinsCaieteRef="cuprinsCaieteRef"
        v-show="sidebarRightShow">
      </sidebar-right>
    </transition>
    <transition name="backdrop">
      <div
        @click="toggleMore"
        v-if="moreOpen"
        :style="{ backgroundColor: currentTheme.backdrop }"
        class="backdrop">
      </div>
    </transition>
    <more
      v-if="moreOpen">
    </more>
  </div>
</template>

<script>
import Firebase from 'firebase'

import { store } from './store/index'

import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
import SidebarRight from './components/SidebarRight'
import More from './components/More'

let app = Firebase.initializeApp({databaseURL: 'https://poeziitraiandorz.firebaseio.com'})
let db = app.database()
let cuprinsCaieteRef = db.ref('cuprinsCaiete')
let cuprinsPoeziiRef = db.ref('cuprinsPoezii')
let poeziiRef = db.ref('poezii')

export default {
  name: 'app',
  firebase: {
    cuprinsCaieteRef,
    cuprinsPoeziiRef,
    poeziiRef
  },
  store,
  components: {
    Navbar,
    SidebarLeft,
    SidebarRight,
    More
  },
  data () {
    return {
      themes: [
        {
          theme: '#ecce93',
          accent: '#ecce93',
          text: '#212121',
          text2: '#757575',
          text3: '#212121',
          border: '#ecce93',
          border2: '#e1e1e1',
          border3: '#e1e1e1',
          background: '#fff',
          backdrop: '#fff',
          navbar: '#fff',
          logo: '#ecce93',
          icon: '#212121',
          icon2: '#212121',
          confirm: '#FFFF00',
          confirm2: '#212121'
        },
        {
          theme: '#ecce93',
          accent: '#ecce93',
          text: '#fff',
          text2: '#dedede',
          text3: '#fff',
          border: '#ecce93',
          border2: '#675d4c',
          border3: '#675d4c',
          background: '#212121',
          backdrop: '#212121',
          navbar: '#212121',
          logo: '#fff',
          icon: '#fff',
          icon2: '#fff',
          confirm: '#C6FF00',
          confirm2: '#212121'
        },
        {
          theme: '#393a3e',
          accent: '#ff764b',
          text: '#393a3e',
          text2: '#757575',
          text3: '#dedede',
          border: '#393a3e',
          border2: '#756b57',
          border3: '#beb6a7',
          background: '#fff4d7',
          backdrop: '#fff4d7',
          navbar: '#393a3e',
          logo: '#fff',
          icon: '#fff',
          icon2: '#757575',
          confirm: '#18FFFF',
          confirm2: '#212121'
        }
        // {
        //   theme: '#CDDC39',
        //   accent: '#7C4DFF',
        //   text: '#212121',
        //   text2: '#424242',
        //   border: '#CDDC39',
        //   border2: '#b5c431',
        //   background: '#CDDC39',
        //   backdrop: '#CDDC39',
        //   navbar: '#fff',
        //   logo: '#4d4d4d',
        //   icon: '#212121',
        //   confirm: '#FFFF00',
        //   confirm2: '#212121'
        // },
        // {
        //   theme: '#FFEB3B',
        //   accent: '#448AFF',
        //   text: '#212121',
        //   text2: '#424242',
        //   border: '#FFEB3B',
        //   border2: '#dac50b',
        //   background: '#FFEB3B',
        //   backdrop: '#FFEB3B',
        //   navbar: '#212121',
        //   logo: '#fff',
        //   icon: '#fff',
        //   confirm: '#FFFF00',
        //   confirm2: '#212121'
        // },
        // {
        //   theme: '#4A148C',
        //   accent: '#69F0AE',
        //   text: '#fff',
        //   text2: '#e6e6e6',
        //   border: '#4A148C',
        //   border2: '#45544d',
        //   background: '#4A148C',
        //   backdrop: '#4A148C',
        //   navbar: '#6A1B9A',
        //   logo: '#fff',
        //   icon: '#fff',
        //   confirm: '#FFFF00',
        //   confirm2: '#212121'
        // },
        // {
        //   theme: '#4E342E',
        //   accent: '#00E5FF',
        //   text: '#fff',
        //   text2: '#e6e6e6',
        //   border: '#4E342E',
        //   border2: '#45544d',
        //   background: '#4E342E',
        //   backdrop: '#4E342E',
        //   navbar: '#FF7043',
        //   logo: '#fff',
        //   icon: '#fff',
        //   confirm: '#FFFF00',
        //   confirm2: '#212121'
        // }
      ]
    }
  },
  created () {
    let metaThemeColor = document.querySelector('meta[name=theme-color]')
    metaThemeColor.setAttribute('content', this.themes[store.getters.getCurrentTheme].theme)
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
    },
    moreOpen () {
      return store.getters.getMoreOpen
    }
  },
  methods: {
    closeSidebars () {
      store.commit('closeSidebars')
    },
    toggleMore () {
      store.commit('toggleMore')
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
.backdrop-enter-active
  animation backdrop-in 0.4s
.backdrop-leave-active
  animation backdrop-out 0.4s
@keyframes backdrop-in
  from
    opacity 0
  to
    opacity 0.8
@keyframes backdrop-out
  to
    opacity 0

.backdrop--sidebar
  @media (min-width $breakpointMobile + 1px)
    display none

.app__main
  position relative
  flex-grow 1
  display flex
  flex-direction column
  width 100%

.app__main-view
  flex-grow 1
.router-view-enter-active
  animation router-view-in 0.4s
.router-view-leave-active
  animation router-view-out 0.4s
@keyframes router-view-in
  from
    opacity 0
  to
    opacity 1
@keyframes router-view-out
  to
    opacity 0

.icon
  cursor pointer
  opacity $iconOpacity
  &:active
    transform scale(0.9)
  &:hover
    opacity 1

.sidebar-slide-left-enter-active
  @media (max-width $breakpointMobile)
    animation slide-left-in $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile + 1px)
    animation width-left-in $sidebarDuration $sidebarTiming
.sidebar-slide-left-leave-active
  @media (max-width $breakpointMobile)
    animation slide-left-out $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile + 1px)
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
  @media (max-width $breakpointMobile)
    animation slide-right-in $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile + 1px)
    animation width-right-in $sidebarDuration $sidebarTiming
.sidebar-slide-right-leave-active
  @media (max-width $breakpointMobile)
    animation slide-right-out $sidebarDuration $sidebarTiming
  @media (min-width $breakpointMobile + 1px)
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
