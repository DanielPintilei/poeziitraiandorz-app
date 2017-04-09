<template>
  <div
    class="poezie">
    <!--{{$store.state.route.path}}-->
    <!--{{$store.state.route.params}}-->
    <transition :name="poezieTransitionName" mode="out-in">
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        tag="article"
        @swipeleft="nextPoezie"
        @swiperight="prevPoezie"
        :key="nr"
        id="poezie"
        :style="{fontSize: fontSize}"
        :class="{select: selectEnabled}"
        class="poezie__main">
        <!--{{ $store.state.lastSelectedPoezie }}-->
        <h1 v-if="poeziiRef[nr-1]" class="poezie__titlu">
          <!--{{ poeziiRef[nr-1].n }}-->
          {{ poeziiRef[nr-1].t }}
        </h1>
        <pre
          v-if="poeziiRef[nr-1]"
          class="poezie__strofe">{{ poeziiRef[nr-1].s }}</pre>
        <loading v-if="!poeziiRef[nr-1]" :color="theme.accent"></loading>
        <br>
        <span class="poezie__url" id="currentURL">{{ currentURL }}</span>
      </v-touch>
    </transition>
    <div
      @click="prevPoezie"
      class="button-prev">
      <svg
        class="icon"
        :fill="theme.icon"
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
        :fill="theme.icon"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </svg>
    </div>
    <div
      class="poezie__share"
      :style="{backgroundColor: theme.background}">
      <svg
        data-clipboard-target="#poezie"
        @click="enableSelect"
        class="icon icon-copy"
        :fill="theme.icon"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
      <svg
        @click="toggleShareMenu"
        :class="{toggled: shareMenuOpen}"
        class="icon icon-share-toggle"
        :fill="shareMenuOpen ? theme.accent : theme.icon"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
      </svg>
    </div>
    <transition name="pop">
      <div
        v-if="showCopyConfirm"
        :style="{backgroundColor: theme.confirm, color: theme.confirmText}"
        class="copy-confirm">
        <span >Copiat</span>
      </div>
    </transition>
    <div
      @click="toggleShareMenu"
      v-if="shareMenuOpen"
      class="backdrop backdrop--social">
    </div>
    <transition name="pop">
      <social-sharing
        v-if="shareMenuOpen"
        class="social"
        :url="currentURL" inline-template>
        <div>
          <network style="height: 28px; cursor: pointer" network="facebook">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="#3B5998">
              <path d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.48-1.195 1.18v1.54h2.39l-.31 2.42h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0" />
            </svg>
          </network>
          <network style="height: 28px; cursor: pointer" network="googleplus">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="#DC4E41">
              <path d="M5.09 7.273v1.745h2.89c-.116.75-.873 2.197-2.887 2.197-1.737 0-3.155-1.44-3.155-3.215S3.353 4.785 5.09 4.785c.99 0 1.652.422 2.03.786l1.382-1.33c-.887-.83-2.037-1.33-3.41-1.33C2.275 2.91 0 5.19 0 8s2.276 5.09 5.09 5.09c2.94 0 4.888-2.065 4.888-4.974 0-.334-.036-.59-.08-.843H5.09zm10.91 0h-1.455V5.818H13.09v1.455h-1.454v1.454h1.455v1.455h1.46V8.727H16" />
            </svg>
          </network>
          <network style="height: 28px; cursor: pointer" network="twitter">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="#1DA1F2">
              <path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.37-1.337.64-2.085.79-.598-.64-1.45-1.04-2.396-1.04-1.812 0-3.282 1.47-3.282 3.28 0 .26.03.51.085.75-2.728-.13-5.147-1.44-6.766-3.42C.83 2.58.67 3.14.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.41-.02-.61-.058.42 1.304 1.63 2.253 3.07 2.28-1.12.88-2.54 1.404-4.07 1.404-.26 0-.52-.015-.78-.045 1.46.93 3.18 1.474 5.04 1.474 6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42.64-.46 1.2-1.04 1.64-1.7z" />
            </svg>
          </network>
        </div>
      </social-sharing>
    </transition>
    <div class="poezie__zoom" :style="{backgroundColor: theme.background}">
      <transition name="slide-zoom-3">
        <svg
          @click="zoomReset"
          v-if="zoomMenuOpen"
          class="icon icon-zoom"
          :fill="theme.icon"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </transition>
      <transition name="slide-zoom-2">
        <svg
          @click="zoomOut"
          v-if="zoomMenuOpen"
          class="icon icon-zoom"
          :fill="theme.icon"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/>
        </svg>
      </transition>
      <transition name="slide-zoom-1">
        <svg
          @click="zoomIn"
          v-if="zoomMenuOpen"
          class="icon icon-zoom"
          :fill="theme.icon"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
        </svg>
      </transition>
      <svg
        @click="toggleZoomMenu"
        :class="{toggled: zoomMenuOpen}"
        class="icon icon-zoom-toggle"
        :fill="zoomMenuOpen ? theme.accent : theme.icon"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import { store } from '../store/index'
import Clipboard from 'clipboard'
import Loading from './Loading'

export default {
  name: 'poezie',
  store,
  props: ['theme', 'nr', 'titlu', 'poeziiRef'],
  components: {
    Loading
  },
  data () {
    return {
      defaultFontSize: store.state.lastFontSize,
      zoomMenuOpen: false,
      shareMenuOpen: false,
      poezieTransitionName: '',
      currentURL: ''
    }
  },
  mounted () {
    this.currentURL = location.href

    let clipboard = new Clipboard('.icon-copy')
    clipboard.on('success', function (e) {
      // console.info('Text:', e.text)
      e.clearSelection()
      store.commit('setSelectEnabled', false)
      store.commit('toggleCopyConfirm')
    })
    clipboard.on('error', function (e) {
      store.commit('setSelectEnabled', false)
    })
  },
  created () {
    window.addEventListener('keyup', this.keyboardNavPoezie)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyboardNavPoezie)
  },
  computed: {
    fontSize () {
      return `${this.defaultFontSize}rem`
    },
    selectEnabled () {
      return store.getters.getSelectEnabled
    },
    showCopyConfirm () {
      return store.getters.getShowCopyConfirm
    }
  },
  methods: {
    checkCaiet (poezie) {
      let routeParent = poezie.parentElement.parentElement.firstElementChild
      if (routeParent && !routeParent.checked) routeParent.click()
    },
    prevPoezie () {
      let currentNr = +document.querySelector('.router-link-active').id
      let prevRoute = document.getElementById(`${currentNr - 1}`)
      if (prevRoute) {
        this.checkCaiet(prevRoute)
        prevRoute.click()
        prevRoute.scrollIntoView()
      } else this.$router.push('inceput')
    },
    nextPoezie () {
      let currentNr = +document.querySelector('.router-link-active').id
      let nextRoute = document.getElementById(`${currentNr + 1}`)
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
      if (this.defaultFontSize > 0.9) this.defaultFontSize -= 0.06
    },
    zoomIn () {
      if (this.defaultFontSize < 1.1) this.defaultFontSize += 0.06
    },
    toggleShareMenu () {
      this.shareMenuOpen = !this.shareMenuOpen
    },
    enableSelect () {
      store.commit('setSelectEnabled', true)
    }
  },
  watch: {
    '$route' (to, from) {
      let toDepth = to.params.order === undefined ? to.params.nr : to.params.order
      let fromDepth = from.params.order === undefined ? from.params.nr : from.params.order

      this.poezieTransitionName = toDepth < fromDepth ? 'slide-right-poezie' : 'slide-left-poezie'

      this.currentURL = location.href
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
  // user-select auto
  will-change transform
  &.select
    user-select: all !important;

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
    transform translateY(-27px) translateX(-50px)
.button-next
  right $iconPrevNextSide
  @media (max-width $breakpointMobileSmall)
    transform translateY(-27px) translateX(50px)

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
.icon-share-toggle
  display inline-block
  @media (max-width $breakpointMobileSmall)
    margin-right 10px
  @media (min-width $breakpointMobileSmall + 1px)
    display block
    margin-top 10px

.copy-confirm
  position absolute
  bottom 80px
  left 50px
  padding 10px 20px
  border-radius 4px
  transform-origin bottom left
  z-index 10
  @media (max-width $breakpointMobileSmall)
    bottom 50px
    left 30px

.backdrop--social
  position fixed

.social
  position absolute
  bottom 40px
  left 60px
  display flex
  align-items center
  justify-content space-around
  width 180px
  height 60px
  padding 4px
  background-color #fff
  box-shadow 4px 2px 6px 0px rgba(0,0,0,0.1)
  border-radius 4px
  transform-origin bottom left
  z-index 10
  @media (max-width $breakpointMobileSmall)
    bottom 50px

.pop-enter-active
  transition transform $popDuration $popTiming
.pop-leave-active
  transition transform $popDuration $popTiming
.pop-enter
.pop-leave-to
  transform scale(0)

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
