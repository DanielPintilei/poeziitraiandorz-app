<template>
  <div
    class="poezie">
    <transition :name="poezieTransitionName" mode="out-in">
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        tag="article"
        @swipeleft="nextPoezie"
        @swiperight="prevPoezie"
        :key="nr"
        id="poezie"
        :style="{fontSize: fontSize}"
        class="poezie__main">
        <template v-for="caiet in caieteRef">
          <template v-for="poezie in caiet.poezii">
            <template v-if="poezie.nr === nr">
              <h1 class="poezie__titlu">{{ poezie.nr }}</h1>
              <h1 class="poezie__titlu">{{ poezie.titlu }}</h1>
              <pre class="poezie__strofe">{{ poezie.strofe }}<br></pre>
            </template>
          </template>
        </template>
        <br>
        <span class="poezie__url" id="currentURL">{{ currentURL }}</span>
      </v-touch>
    </transition>
    <div
      @click="prevPoezie"
      class="button-prev">
      <svg
        class="icon"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </div>
    <div
      @click="nextPoezie"
      class="button-next">
      <svg
        class="icon"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    </div>
    <div
      @mouseenter="setCurrentURL"
      class="poezie__share"
      :style="{backgroundColor: theme.backgroundColor}">
      <svg
        @click="copyPoezie"
        class="icon icon-copy"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
      <svg
        @click="copyURL"
        class="icon icon-copy"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
      </svg>
    </div>
    <div class="poezie__zoom" :style="{backgroundColor: theme.backgroundColor}">
      <transition name="slide-zoom-3">
        <svg
          @click="zoomReset"
          v-if="zoomMenuOpen !== false"
          class="icon icon-zoom"
          :fill="theme.iconColor"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </transition>
      <transition name="slide-zoom-2">
        <svg
          @click="zoomOut"
          v-if="zoomMenuOpen !== false"
          class="icon icon-zoom"
          :fill="theme.iconColor"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/>
        </svg>
      </transition>
      <transition name="slide-zoom-1">
        <svg
          @click="zoomIn"
          v-if="zoomMenuOpen !== false"
          class="icon icon-zoom"
          :fill="theme.iconColor"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
        </svg>
      </transition>
      <svg
        @click="toggleZoomMenu"
        :class="{toggled: zoomMenuOpen === true}"
        class="icon icon-zoom-toggle"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { store } from '../store/index'
// import Hammer from 'hammerjs'

export default {
  name: 'poezie',
  store,
  props: ['theme', 'nr', 'titlu', 'strofe', 'caieteRef'],
  data () {
    return {
      defaultFontSize: store.state.lastFontSize,
      zoomMenuOpen: false,
      shareMenuOpen: false,
      poezieTransitionName: '',
      currentURL: ''
    }
  },
  // mounted () {
  //   let poezie = document.getElementById('poezie')
  //   let panPoezie = new Hammer(poezie)
  //   panPoezie.on('panleft pancancel', (ev) => {
  //     console.log(ev)
  //     this.nextPoezie()
  //     // setTimeout(() => {
  //     // }, 1000)
  //   })
  // },
  created () {
    window.addEventListener('keyup', this.keyboardNavPoezie)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyboardNavPoezie)
  },
  computed: {
    fontSize () {
      return `${this.defaultFontSize}rem`
    }
  },
  methods: {
    checkCaiet (poezie) {
      let routeParent = poezie.parentElement.parentElement.firstElementChild
      if (!routeParent.checked) routeParent.click()
    },
    prevPoezie () {
      let currentNr = +this.nr
      let prevRoute = document.getElementById(`r${currentNr - 1}`)
      if (prevRoute) {
        this.checkCaiet(prevRoute)
        prevRoute.click()
        prevRoute.scrollIntoView()
      } else this.$router.push('inceput')
    },
    nextPoezie () {
      let currentNr = +this.nr
      let nextRoute = document.getElementById(`r${currentNr + 1}`)
      if (nextRoute) {
        nextRoute.click()
        this.checkCaiet(nextRoute)
        nextRoute.scrollIntoView()
      } else this.$router.push('sfarsit')
    },
    keyboardNavPoezie (e) {
      let searchFocus = document.getElementById('searchInput') === document.activeElement
      if (e.key === 'ArrowLeft' && !searchFocus) {
        this.prevPoezie()
      } else if (e.key === 'ArrowRight' && !searchFocus) {
        this.nextPoezie()
      }
    },
    toggleZoomMenu () {
      this.zoomMenuOpen = !this.zoomMenuOpen
    },
    zoomReset () {
      this.defaultFontSize = store.state.defaultFontSize
    },
    zoomOut () {
      this.defaultFontSize -= 0.04
    },
    zoomIn () {
      this.defaultFontSize += 0.04
    },
    toggleShareMenu () {
      this.shareMenuOpen = !this.shareMenuOpen
    },
    setCurrentURL () {
      this.currentURL = location.href
    },
    copyElementText (elcopy) {
      const selectElementText = (el) => {
        let range = document.createRange()
        range.selectNodeContents(el)
        let selection = window.getSelection()
        selection.removeAllRanges()
        selection.addRange(range)
      }
      selectElementText(elcopy)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    },
    copyPoezie () {
      let poezie = document.getElementById('poezie')
      this.copyElementText(poezie)
    },
    copyURL () {
      let currentURL = document.getElementById('currentURL')
      this.copyElementText(currentURL)
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.params.nr
      const fromDepth = from.params.nr
      this.poezieTransitionName = toDepth < fromDepth ? 'slide-right-poezie' : 'slide-left-poezie'
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../variables"

.poezie
  display flex
  flex-direction column
  align-items center
  padding 35px 25px 60px
  overflow-x hidden
  overflow-y auto
  @media (min-width $breakpointMobileSmall + 1px)
    padding 50px 30px
  @media (min-width 900px)
    padding 100px 60px

.poezie__main
  flex-grow 1
  flex-shrink 0
  user-select auto
  will-change transform

.slide-left-poezie-enter-active
  animation slide-left-poezie-in 0.3s ease-in-out
.slide-left-poezie-leave-active
  animation slide-left-poezie-out 0.3s ease-in-out
@keyframes slide-left-poezie-in
  from
    transform translateX(100%)
    opacity 0
  to
    transform translateX(0)
    opacity 1
@keyframes slide-left-poezie-out
  from
    transform translateX(0)
  to
    transform translateX(-100%)
    opacity 0

.slide-right-poezie-enter-active
  animation slide-right-poezie-in 0.3s ease-in-out
.slide-right-poezie-leave-active
  animation slide-right-poezie-out 0.3s ease-in-out
@keyframes slide-right-poezie-in
  from
    transform translateX(-100%)
    opacity 0
  to
    transform translateX(0)
    opacity 1
@keyframes slide-right-poezie-out
  from
    transform translateX(0)
  to
    transform translateX(100%)
    opacity 0

.poezie__titlu
  max-width 600px
  margin 0 0 1em
  font-family 'Playfair Display', serif
  font-size 1.875em
  font-weight normal
  line-height 1.3;
  @media (max-width $breakpointMobileSmall)
    font-size 1.5em
  @media (min-width $breakpointMobile + 1px)
    margin 0 0 2em

.poezie__strofe
  margin 0 0 1.6em
  font-family 'Libre Baskerville', serif
  font-size 1em
  line-height 1.45
  white-space pre-wrap
  @media (max-width $breakpointMobileSmall)
    font-size 0.938em
  @media (min-width $breakpointMobile + 1px)
    columns 2
    column-gap 3em

$iconPrevNextSide = 20px
.button-prev
.button-next
  height 24px
  opacity 0.5
  @media (max-width $breakpointMobileSmall)
    display flex
  @media (min-width $breakpointMobileSmall + 1px)
    position absolute
    top 50%
    transform translateY(-50%)
.button-prev
  left $iconPrevNextSide
  @media (max-width $breakpointMobileSmall)
    transform translateY(-27px) translateX(-30px)
.button-next
  right $iconPrevNextSide
  @media (max-width $breakpointMobileSmall)
    transform translateY(-27px) translateX(30px)

.poezie__url
  display block
  height 0
  opacity 0

.poezie__share
.poezie__zoom
  position absolute
  bottom $poezieButtonGroupBottom
  overflow hidden
  @media (max-width $breakpointMobileSmall)
    bottom 0
    width 50%
    padding 10px 10px 5px
  @media (min-width $breakpointMobileSmall + 1px)
    background-color transparent !important

.icon-share-toggle
.icon-zoom-toggle
  &.toggled
    opacity 1

.poezie__share
  left $poezieButtonGroupSide
  @media (max-width $breakpointMobileSmall)
    left 0

.icon-copy
  display inline-block
  @media (max-width $breakpointMobileSmall)
    margin-right 10px
  @media (min-width $breakpointMobileSmall + 1px)
    display block
    margin-top 10px

.poezie__zoom
  right $poezieButtonGroupSide
  @media (max-width $breakpointMobileSmall)
    right 0
    text-align right

.icon-zoom
  display inline-block
  @media (max-width $breakpointMobileSmall)
    margin-right 10px
  @media (min-width $breakpointMobileSmall + 1px)
    display block
    margin-bottom 10px

$slideZoomDuration = 0.2s
$slideZoomDelay2 = 0.1s
$slideZoomDelay1 = 0.05s

.slide-zoom-3-enter-active
  animation slide-zoom-in $slideZoomDuration
  animation-delay $slideZoomDelay2
  &.icon-zoom
    opacity 0
.slide-zoom-3-leave-active
  animation slide-zoom-out $slideZoomDuration

.slide-zoom-2-enter-active
  animation slide-zoom-in $slideZoomDuration
  animation-delay $slideZoomDelay1
  &.icon-zoom
    opacity 0
.slide-zoom-2-leave-active
  animation slide-zoom-out $slideZoomDuration
  animation-delay $slideZoomDelay1

.slide-zoom-1-enter-active
  animation slide-zoom-in $slideZoomDuration
.slide-zoom-1-leave-active
  animation slide-zoom-out $slideZoomDuration
  animation-delay $slideZoomDelay2

@keyframes slide-zoom-in
  from
    transform translateX(24px)
    opacity 0
  to
    transform translateX(0)
    opacity $iconOpacity
@keyframes slide-zoom-out
  from
    transform translateX(0)
  to
    transform translateX(24px)
    opacity 0

</style>
