<template>
  <div class="theme-picker">
    <div
      v-for="(theme, index) in themes"
      @click="setSelectedTheme(index)"
      :style="{ backgroundColor: theme.background }"
      class="swatch">
      <div
        class="swatch__inner"
        :style="{ backgroundColor: index === currentTheme ? theme.accent : '' }">
        <svg
          v-if="index === currentTheme"
          :fill="theme.background"
          class="swatch__check"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theme-picker',
  props: ['themes'],
  data () {
    return {
    }
  },
  computed: {
    currentTheme () {
      return this.$store.state.currentTheme
    }
  },
  methods: {
    setSelectedTheme (n) {
      this.$store.commit('setSelectedTheme', n)

      const currentTheme = this.themes[this.$store.state.currentTheme]

      document.querySelector('meta[name=theme-color]').setAttribute('content', currentTheme.theme)

      document.body.style.setProperty('--themeBG', currentTheme.background)
    }
  }
}
</script>

<style scoped lang="stylus">

.theme-picker
  display flex
  flex-wrap wrap
  width 148px
  position absolute
  top 100%
  right 100%
  padding 5px
  background-color #fff
  box-shadow 4px 2px 6px 0px hsla(0, 0%, 0%, 0.1)
  border-radius 4px
  transform-origin top right
  z-index 20

.swatch
  display flex
  align-items center
  justify-content center
  width 40px
  height 40px
  margin 3px
  border-radius 50%
  border 1px solid hsla(0, 0%, 0%, 0.1)
  cursor pointer
  &:active
    transform scale(0.9)

.swatch__inner
  display flex
  align-items center
  justify-content center
  width 20px
  height 20px
  border-radius 3px

.swatch__check
  width 18px
  height 18px
  animation swatch-check 0.2s forwards
@keyframes swatch-check
  from
    transform scale(0)
  to
    transform scale(1)

</style>
