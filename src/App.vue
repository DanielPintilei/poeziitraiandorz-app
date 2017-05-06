<template>
  <div
    id="app"
    class="app"
    :style="{
      color: selectedTheme.text,
      backgroundColor: selectedTheme.background,
      borderColor: selectedTheme.border
    }">
    <svg style="display: none">
      <symbol id="iconList" viewBox="0 0 24 24">
        <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
        <path d="M0 0h24v24H0V0z" fill="none"/>
      </symbol>
      <symbol id="iconCaiet" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
      </symbol>
      <symbol id="iconCaret" viewBox="0 0 24 24">
        <path d="m 9.5,17.5 5,-5 -5,-5 z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </symbol>
      <symbol id="iconSearch" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </symbol>
      <symbol id="iconCheck" viewBox="0 0 24 24">
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </symbol>
      <symbol id="iconCheckOn" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </symbol>
      <symbol id="iconPrev" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </symbol>
      <symbol id="iconNext" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </symbol>
    </svg>
    <transition name="backdrop">
      <div
        @click="closeSidebars"
        v-if="$store.state.sidebarLeftToggled || $store.state.sidebarRightToggled"
        :style="{ backgroundColor: selectedTheme.backdrop }"
        class="backdrop backdrop--sidebar">
      </div>
    </transition>
    <transition name="sidebar-slide-left">
        <!--v-on:setCuprinsPoeziiSort="getCuprinsPoeziiSort"-->
        <!--:cuprinsPoeziiSort="cuprinsPoeziiSort"-->
      <sidebar-left
        :folderListSnap="folderListSnap"
        :theme="selectedTheme"
        v-show="$store.state.sidebarLeftToggled">
      </sidebar-left>
    </transition>
    <main
      :style="{ backgroundColor: selectedTheme.background2 }"
      class="app__main">
        <!--v-on:setFullBook="getPoeziiSnap"-->
      <navbar
        v-on:getFolderList="getFolderListSnap"
        :theme="selectedTheme"
        :themes="themes">
      </navbar>
      <transition name="router-view" mode="out-in">
          <!--:poeziiSnap="poeziiSnap"-->
        <router-view
          :theme="selectedTheme"
          class="app__main-view">
        </router-view>
      </transition>
    </main>
    <!--<transition name="sidebar-slide-right">
      <sidebar-right
        :theme="selectedTheme"
        v-show="$store.state.sidebarRightToggled">
      </sidebar-right>
    </transition>-->
    <transition name="backdrop">
      <div
        @click="toggleMore"
        v-if="$store.state.moreOpen"
        :style="{ backgroundColor: selectedTheme.backdrop }"
        class="backdrop">
      </div>
    </transition>
    <transition name="backdrop">
      <more
        :theme="selectedTheme"
        v-if="$store.state.moreOpen">
      </more>
    </transition>
  </div>
</template>

<script>
import Firebase from 'firebase'

import Navbar from './components/Navbar'
import SidebarLeft from './components/SidebarLeft'
// import SidebarRight from './components/SidebarRight'
import More from './components/More'

const app = Firebase.initializeApp({databaseURL: 'https://poeziitraiandorz.firebaseio.com'})
const db = app.database()
const folderListRef = db.ref('cuprinsCaiete')
const poemsRef = db.ref('poezii')

export default {
  name: 'app',
  components: {
    Navbar,
    SidebarLeft,
    // SidebarRight,
    More
  },
  data () {
    return {
      folderListSnap: null,
      // cuprinsPoeziiSort: null,
      // poeziiSnap: [],
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
          confirm2: '#757575',
          rule: '#e6e6e6'
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
          confirm2: '#212121',
          rule: '#333'
        },
        {
          theme: '#393a3e',
          accent: '#ff764b',
          text: '#393a3e',
          text2: '#757575',
          text3: '#dedede',
          border: '#393a3e',
          border2: '#605c52',
          border3: '#beb6a7',
          background: '#fff4d7',
          backdrop: '#fff4d7',
          navbar: '#393a3e',
          logo: '#fff',
          icon: '#fff',
          icon2: '#757575',
          confirm: '#18FFFF',
          confirm2: '#757575',
          rule: '#eee0ba'
        }
      ]
    }
  },
  created () {
    const selectedTheme = this.themes[this.$store.state.selectedTheme]
    const metaThemeColor = document.querySelector('meta[name=theme-color]')
    metaThemeColor.setAttribute('content', selectedTheme.theme)
    document.body.style.setProperty('--themeBG', selectedTheme.background)
    this.poemSnap()
  },
  mounted () {
    if (this.$store.state.sidebarLeftToggled) this.getFolderListSnap()
  },
  computed: {
    selectedTheme () {
      return this.themes[this.$store.state.selectedTheme]
    },
    currentNr () {
      return this.$store.state.route.params.nr - 1
    }
  },
  methods: {
    closeSidebars () {
      this.$store.commit('closeSidebars')
    },
    toggleMore () {
      this.$store.commit('toggleMore')
    },
    getFolderListSnap () {
      const parseSnap = () => {
        this.folderListSnap = JSON.parse(localStorage.getItem('poezii'))
      }
      const setStore = () => {
        this.$store.commit('setFolderListLoaded')
      }
      if (!localStorage.getItem('poezii')) {
        const getSnap = (snap) => {
          localStorage.setItem('poezii', JSON.stringify(snap.val()))
          parseSnap()
          setStore()
        }
        folderListRef.once('value').then(getSnap)
      } else {
        parseSnap()
        setStore()
      }
    },
    // getCuprinsPoeziiSort () {
    //   let cuprinsPoezii = []
    //   for (const caiet of this.folderListSnap) {
    //     for (const poem of caiet.p) {
    //       cuprinsPoezii.push(poem)
    //     }
    //   }
    //   this.cuprinsPoeziiSort = cuprinsPoezii.sort((a, b) => a.t.localeCompare(b.t, 'ro'))
    // },
    poemSnap () {
      const getSnap = (snap) => {
        this.$store.commit('setSelectedPoem', snap.val())
      }
      poemsRef.child(this.currentNr).once('value').then(getSnap)
    }
    // getPoeziiSnap () {
    //   const getSnap = (snap) => {
    //     this.poeziiSnap = snap.val()
    //     this.$store.commit('setPoeziiSnap')
    //   }
    //   poemsRef.once('value').then(getSnap)
    // }
  },
  watch: {
    '$route' () {
      if (!this.$store.state.fullBook) {
        this.poemSnap()
      }
    }
  }
}
</script>

<style lang="stylus">
@import "variables"

:root
  --themeBG #fff

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
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)
  background-color var(--themeBG)

::-webkit-scrollbar
  width: 8px
  background-color $scrollbarTrackBackground
::-webkit-scrollbar-thumb
  background-color $scrollbarThumbBackground

.app
  position relative
  display flex
  width 100%
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
  display flex
  flex-direction column
  width 100%

.app__main-view
  flex-grow 1
  overflow-x hidden
  overflow-y auto

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

// .sidebar-slide-right-enter-active
//   @media (max-width $breakpointMobile)
//     animation slide-right-in $sidebarDuration $sidebarTiming
//   @media (min-width $breakpointMobile + 1px)
//     animation width-right-in $sidebarDuration $sidebarTiming
// .sidebar-slide-right-leave-active
//   @media (max-width $breakpointMobile)
//     animation slide-right-out $sidebarDuration $sidebarTiming
//   @media (min-width $breakpointMobile + 1px)
//     animation width-right-out $sidebarDuration $sidebarTiming
// @keyframes width-right-in
//   from
//     width 0
//   to
//     width $sidebarRightWidth
// @keyframes width-right-out
//   from
//     width $sidebarRightWidth
//   to
//     width 0
// @keyframes slide-right-in
//   from
//     transform translateX($sidebarRightWidth)
//   to
//     transform translateX(0)
// @keyframes slide-right-out
//   from
//     transform translateX(0)
//   to
//     transform translateX($sidebarRightWidth)

</style>
