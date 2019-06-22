<template>
  <div
    id="poemParent"
    class="poem">
    <transition
      @after-leave="afterLeave"
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
          <br>
          <p v-if="selectedPoem.d" class="poem__desc">{{ selectedPoem.d }}</p>
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
        <use href="#iconPrev"></use>
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
        <use href="#iconNext"></use>
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
        v-if="navigatorHasShare"
        @click="toggleShareMenu"
        class="icon icon-share-toggle"
        :fill="theme.icon2"
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
import ClipboardJS from 'clipboard'
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
      poemTransitionName: '',
      currentURL: '',
      navigatorHasShare: typeof navigator !== 'undefined' && navigator.share
    }
  },
  mounted () {
    this.currentURL = location.href
    const clipboard = new ClipboardJS('#btnCopy')
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
      navigator
        .share({
          title: this.selectedPoem.t,
          text: this.selectedPoem.s,
          url: this.currentURL
        })
        .catch(error => error)
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
  user-select text
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
  margin 0
  font-family $font1
  font-size 2em
  font-weight normal
  line-height 1.3
  @media (max-width $breakpointMobileSmall)
    font-size 1.65em
    line-height 1.1

.poem__desc
.poem__blocks
  margin 0
  font-family $font2
  font-size 1.063em
  line-height 1.4

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
