<template>
  <div
    id="poemParent"
    class="poem">
    <transition
      v-on:after-leave="afterLeave"
      :name="poemTransitionName"
      mode="out-in">
      <article
        :key="nr"
        id="poem"
        :style="{fontSize: fontSizeREM}"
        :class="{select: $store.state.selectEnabled}"
        class="poem__main">
        <template v-if="selectedPoem">
          <h1 class="poem__title">
            {{ selectedPoem.t }}
          </h1>
          <p class="poem__desc">{{ selectedPoem.d }}</p>
          <pre
            :style="{columnRuleColor: theme.rule}"
            class="poem__blocks">{{ selectedPoem.s }}</pre>
        </template>
        <loading class="loading" :color="theme.accent"></loading>
        <br>
        <span class="poem__author">—Traian Dorz</span>
        <br>
        <span class="poem__url" id="currentURL">{{ currentURL }}</span>
      </article>
    </transition>
    <div
      v-if="$store.state.folderListDownloaded"
      @click="prevPoem"
      class="button-prev">
      <svg
        class="icon"
        :fill="theme.icon2"
        height="24" width="24">
        <use xlink:href="#iconPrev"></use>
      </svg>
    </div>
    <div
      v-if="$store.state.folderListDownloaded"
      @click="nextPoem"
      class="button-next">
      <svg
        class="icon"
        :fill="theme.icon2"
        height="24" width="24">
        <use xlink:href="#iconNext"></use>
      </svg>
    </div>
    <div
      class="poem__share"
      :style="{backgroundColor: theme.background}">
      <svg
        data-clipboard-target="#poem"
        @click="enableSelect"
        class="icon icon-copy"
        id="btnCopy"
        :fill="theme.icon2"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
      </svg>
      <svg
        @click="toggleShareMenu"
        :class="{toggled: shareMenuOpen}"
        class="icon icon-share-toggle"
        :fill="shareMenuOpen ? theme.accent : theme.icon2"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
      </svg>
    </div>
    <transition name="pop">
      <div
        v-if="$store.state.copyConfirmShown"
        :style="{backgroundColor: theme.confirm, color: theme.confirm2}"
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
        <!--:url="currentURL"-->
      <social-sharing
        v-if="shareMenuOpen"
        class="social"
        :title="selectedPoem.t"
        :description="selectedPoem.s"
        inline-template>
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
          <network style="height: 28px; cursor: pointer" network="whatsapp">
            <svg width="28" height="28" viewBox="0 0 16 16" fill="#25D366">
              <path d="M11.665 9.588c-.2-.1-1.177-.578-1.36-.644-.182-.067-.315-.1-.448.1-.132.197-.514.643-.63.775-.116.13-.232.14-.43.05-.2-.1-.842-.31-1.602-.99-.592-.53-.99-1.18-1.107-1.38-.116-.2-.013-.31.087-.41.09-.09.2-.23.3-.35.098-.12.13-.2.198-.33.066-.14.033-.25-.017-.35-.05-.1-.448-1.08-.614-1.47-.16-.39-.325-.34-.448-.34-.115-.01-.248-.01-.38-.01-.134 0-.35.05-.532.24-.182.2-.696.68-.696 1.65s.713 1.91.812 2.05c.1.13 1.404 2.13 3.4 2.99.476.2.846.32 1.136.42.476.15.91.13 1.253.08.383-.06 1.178-.48 1.344-.95.17-.47.17-.86.12-.95-.05-.09-.18-.14-.38-.23M8.04 14.5h-.01c-1.18 0-2.35-.32-3.37-.92l-.24-.143-2.5.65.67-2.43-.16-.25c-.66-1.05-1.01-2.26-1.01-3.506 0-3.63 2.97-6.59 6.628-6.59 1.77 0 3.43.69 4.68 1.94 1.25 1.24 1.94 2.9 1.94 4.66-.003 3.63-2.973 6.59-6.623 6.59M13.68 2.3C12.16.83 10.16 0 8.03 0 3.642 0 .07 3.556.067 7.928c0 1.397.366 2.76 1.063 3.964L0 16l4.223-1.102c1.164.63 2.474.964 3.807.965h.004c4.39 0 7.964-3.557 7.966-7.93 0-2.117-.827-4.11-2.33-5.608"/>
            </svg>
          </network>
        </div>
      </social-sharing>
    </transition>
    <div class="poem__zoom" :style="{backgroundColor: theme.background}">
      <transition name="slide-zoom-3">
        <svg
          @click="zoomReset"
          v-if="zoomMenuOpen"
          class="icon icon-zoom"
          :fill="theme.icon2"
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
          :fill="theme.icon2"
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
          :fill="theme.icon2"
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
        :fill="zoomMenuOpen ? theme.accent : theme.icon2"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"/>
      </svg>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import Loading from './Loading'

export default {
  name: 'poem',
  props: ['theme', 'nr', 'selectedPoem'],
  components: {
    Loading
  },
  data () {
    return {
      zoomMenuOpen: false,
      shareMenuOpen: false,
      poemTransitionName: '',
      currentURL: ''
    }
  },
  mounted () {
    this.currentURL = location.href
    const clipboard = new Clipboard('#btnCopy')
    clipboard.on('success', (e) => {
      e.clearSelection()
      this.$store.commit('setSelectEnabled', false)
      this.$store.commit('toggleCopyConfirm')
    })
    clipboard.on('error', (e) => {
      this.$store.commit('setSelectEnabled', false)
    })
  },
  created () {
    window.addEventListener('keyup', this.handlePoemKeyNav)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.handlePoemKeyNav)
  },
  computed: {
    fontSizeREM () {
      return `${this.$store.state.selectedFontSize}rem`
    }
  },
  methods: {
    checkFolder (poemLink) {
      const routeParent = poemLink.parentElement.parentElement.firstElementChild
      if (routeParent && !routeParent.checked) routeParent.click()
    },
    prevPoem () {
      const currentNr = +document.querySelector('.router-link-active').id
      const prevRoute = document.getElementById(`${currentNr - 1}`)
      if (prevRoute) {
        this.checkFolder(prevRoute)
        prevRoute.click()
        prevRoute.scrollIntoView()
      } else this.$router.push('beginning')
    },
    nextPoem () {
      const currentNr = +document.querySelector('.router-link-active').id
      const nextRoute = document.getElementById(`${currentNr + 1}`)
      if (nextRoute) {
        nextRoute.click()
        this.checkFolder(nextRoute)
        nextRoute.scrollIntoView()
      } else this.$router.push('end')
    },
    handlePoemKeyNav (e) {
      const searchFocused = this.$store.state.searchFocused
      if (e.key === 'ArrowLeft' && !searchFocused) {
        this.prevPoem()
      } else if (e.key === 'ArrowRight' && !searchFocused) {
        this.nextPoem()
      }
    },
    toggleZoomMenu () {
      this.zoomMenuOpen = !this.zoomMenuOpen
    },
    zoomReset () {
      this.$store.commit('zoomReset')
    },
    zoomOut () {
      this.$store.commit('zoomOut')
    },
    zoomIn () {
      this.$store.commit('zoomIn')
    },
    toggleShareMenu () {
      this.shareMenuOpen = !this.shareMenuOpen
    },
    enableSelect () {
      this.$store.commit('setSelectEnabled', true)
    },
    afterLeave () {
      document.getElementById('poemParent').scrollTop = 0
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.params.nr
      const fromDepth = from.params.nr
      this.poemTransitionName = toDepth < fromDepth ? 'slide-right-poem' : 'slide-left-poem'
      this.currentURL = location.href
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../variables"

.poem
  display flex
  flex-direction column
  align-items center
  margin-bottom 43px
  padding 35px 25px 17px
  cursor default
  max-width 100%
  @media (min-width $breakpointMobileSmall + 1px)
    padding 50px 30px
  @media (min-width $breakpointMobile + 1px)
    padding 70px 80px

.poem__main
  flex-grow 1
  max-width 100%
  will-change transform
  &.select
    user-select: all !important

.slide-left-poem-enter-active
  animation slide-left-poem-in 0.3s ease-in-out
.slide-left-poem-leave-active
  animation slide-left-poem-out 0.3s ease-in-out
@keyframes slide-left-poem-in
  from
    transform translateX(100%)
    opacity 0
  to
    transform translateX(0)
    opacity 1
@keyframes slide-left-poem-out
  from
    transform translateX(0)
  to
    transform translateX(-100%)
    opacity 0

.slide-right-poem-enter-active
  animation slide-right-poem-in 0.3s ease-in-out
.slide-right-poem-leave-active
  animation slide-right-poem-out 0.3s ease-in-out
@keyframes slide-right-poem-in
  from
    transform translateX(-100%)
    opacity 0
  to
    transform translateX(0)
    opacity 1
@keyframes slide-right-poem-out
  from
    transform translateX(0)
  to
    transform translateX(100%)
    opacity 0

.poem__title
  margin 0 0 0.8em
  font-family $font1
  font-size 2em
  font-weight normal
  line-height 1.3
  @media (max-width $breakpointMobileSmall)
    font-size 1.65em
    line-height 1.1
  @media (min-width $breakpointMobile + 1px)
    margin 0 0 1.2em

.poem__desc
.poem__blocks
  margin 0
  font-family $font2
  font-size 1.063em
  line-height 1.4
  @media (max-width $breakpointMobileSmall)
    font-size 1em

.poem__desc
  margin-bottom 1.5em
  font-style italic
  @media (max-width $breakpointMobile)
    max-width 400px

.poem__blocks
  white-space pre-wrap
  @media (min-width $breakpointMobile + 1px)
    columns 250px 2
    column-gap 6em
    column-rule 1px solid
  &:not(:empty) + .loading
    display none

$iconPrevNextSide = 20px
.button-prev
.button-next
  height 24px
  opacity 0.2
  @media (min-width $breakpointMobileSmall + 1px)
    position absolute
    top 50%
    transform translateY(-50%)
    opacity 0.5
.button-prev
  margin-bottom -24px
  left $iconPrevNextSide
  @media (max-width $breakpointMobileSmall)
    transform translateY(-10px) translateX(-50px)
.button-next
  right $iconPrevNextSide
  @media (max-width $breakpointMobileSmall)
    transform translateY(-10px) translateX(50px)

.poem__author
.poem__url
  display block
  height 0
  opacity 0

.poem__share
.poem__zoom
  position absolute
  bottom $poemButtonGroupBottom
  overflow hidden
  @media (max-width $breakpointMobileSmall)
    bottom 0
    padding 10px 10px 5px

.icon-share-toggle
.icon-zoom-toggle
  &.toggled
    opacity 1

.poem__share
  left $poemButtonGroupSide
  @media (max-width $breakpointMobileSmall)
    left 0
    width 35%

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

.poem__zoom
  right $poemButtonGroupSide
  @media (max-width $breakpointMobileSmall)
    right 0
    width 70%
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
