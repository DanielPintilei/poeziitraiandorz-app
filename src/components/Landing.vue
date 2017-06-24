<template>
  <div class="landing">
    <div>
      <div class="landing-intro">
        <img
          :style="{color: theme.accent}"
          class="landing-img"
          src="../assets/traian-dorz.jpg"
          alt="Traian Dorz">
        <h1 class="landing__header" :style="{color: theme.accent}">
          <div>Slăvit</div>
          <div>să fie</div>
          <div>Domnul</div>
        </h1>
      </div>
      <p class="landing-info">
        <button
          @click="toggleSidebarLeft"
          @mouseenter="listButtonHovered = true"
          @mouseleave="listButtonHovered = false"
          type="button"
          class="button"
          :style="{
            color: listButtonHovered ? theme.background : theme.accent,
            backgroundColor: listButtonHovered ? theme.accent : ''
          }"
        >
          Cuprins
        </button>
        <button
          @click="toggleSidebarRight"
          @mouseenter="searchButtonHovered = true"
          @mouseleave="searchButtonHovered = false"
          type="button"
          class="button"
          :style="{
            color: searchButtonHovered ? theme.background : theme.accent,
            backgroundColor: searchButtonHovered ? theme.accent : ''
          }"
        >
          Căutare
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  props: ['theme'],
  data () {
    return {
      listButtonHovered: false,
      searchButtonHovered: false
    }
  },
  methods: {
    toggleSidebarLeft () {
      this.$store.commit('toggleSidebarLeft')
      if (!this.$store.state.folderListDownloaded) this.$emit('downloadFolderList')
    },
    toggleSidebarRight () {
      this.$store.commit('toggleSidebarRight')
      this.$store.commit('setFullBook')
      if (!this.$store.state.poemsDownloaded) this.$emit('downloadPoems')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../variables"

imgOriginalWidth = 230px
imgOriginalHeight = 395px
imgBorderWidth = 5px
imgWidth = imgOriginalWidth + imgBorderWidth * 2
imgHeight = imgOriginalHeight + imgBorderWidth * 2

.landing
  display flex
  flex-direction column
  align-items center
  justify-content flex-start
  padding 40px
  cursor default

.landing-intro
  flex-shrink 0
  display flex
  align-items flex-start
  @media (max-width 399px)
    flex-direction column

.landing-img
  flex-shrink 0
  width imgWidth
  height imgHeight
  border imgBorderWidth solid transparent
  box-shadow 0 0 0 1px currentColor
  transition filter 3s
  filter grayscale(50%)
  &:hover
    filter none
  @media (max-width 399px)
    order 1
  @media (max-width $breakpointMobileSmall)
    width (imgWidth / 1.2)
    height (imgHeight / 1.2)

.landing__header
  position relative
  margin-top 0
  margin-bottom 20px
  font-family $font2
  font-size 54px
  line-height 1
  font-weight normal
  font-style italic
  color gray
  @media (min-width 400px)
    margin 36px 0 36px -60px
  @media (min-width $breakpointMobileSmall + 1px)
    margin-left -80px
    font-size 72px

.landing-info
  margin-top 18px
  margin-bottom 18px
  font-size 18px
  @media (min-width $breakpointMobileSmall + 1px)
    max-width imgWidth + 300px
    padding-left imgWidth + 20px

.button
  margin-right 10px
  margin-bottom: 10px
  padding 10px 30px
  text-align center
  font-size 15px
  border 1px solid currentColor
  background-color transparent
  box-shadow none
  cursor pointer
  user-select none
  outline none
  -webkit-appearance none
  transition color 0.1s, background-color 0.1s

</style>
