<template>
  <article
    class="poezie">
    <div
      :style="{fontSize: fontSize}"
      class="poezie__main">
      <h1 class="poezie__titlu">{{ titlu }}</h1>
      <pre class="poezie__strofe">{{ strofe }}<br></pre>
    </div>
    <div class="poezie__zoom">
      <svg
        @click="zoomReset"
        v-if="zoomMenuOpen !== false"
        class="icon icon-zoom"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <svg
        @click="zoomOut"
        v-if="zoomMenuOpen !== false"
        class="icon icon-zoom"
        :fill="theme.iconColor"
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/>
      </svg>
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
  </article>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'poezie',
  store,
  props: ['theme', 'nr', 'titlu', 'strofe', 'caieteRef'],
  data () {
    return {
      defaultFontSize: store.state.lastFontSize,
      zoomMenuOpen: false
    }
  },
  computed: {
    fontSize () {
      return `${this.defaultFontSize}rem`
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped lang="stylus">

.poezie
  display flex
  flex-direction column
  align-items center
  padding 50px 30px
  overflow auto
  @media (min-width 900px)
    padding 100px 60px

.poezie__main
  flex-grow 1
  flex-shrink 0
  user-select auto

.poezie__titlu
  max-width 600px
  margin 0 0 1em
  font-family 'Playfair Display', serif
  font-size 1.9em
  font-weight normal
  line-height 1.3;
  @media (min-width 900px)
    margin 0 0 2em

.poezie__strofe
  margin 0 0 1.6em
  font-family 'Libre Baskerville', serif
  font-size 1em
  line-height 1.45
  white-space pre-wrap
  @media (min-width 900px)
    columns 2
    column-gap 3em

.poezie__zoom
  position absolute
  bottom 10px
  right 25px
  display flex
  flex-direction column

.icon-zoom-toggle
  &.toggled
    opacity 1

.icon-zoom
  margin-bottom 10px

</style>
