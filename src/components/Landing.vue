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
      <div class="landing-info">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  props: ['theme'],
  data () {
    return {
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

.landing-intro
  flex-shrink 0
  display flex

.landing-img
  flex-shrink 0
  width imgWidth
  height imgHeight
  border imgBorderWidth solid transparent
  box-shadow 0 0 0 1px currentColor
  transition 3s
  filter grayscale(50%)
  &:hover
    filter none

.landing__header
  position relative
  margin-left -80px
  font-family $font2
  font-size 72px
  line-height 1
  font-weight normal
  font-style italic
  color gray
  cursor default

.landing-info
  max-width imgWidth + 400px
  padding-left imgWidth + 20px

</style>
