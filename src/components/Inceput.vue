<template>
  <v-touch
    :swipe-options="{ direction: 'horizontal'}"
    @swipeleft="goBack"
    class="out">
    <pre
      :style="{ color: theme.accent }"
      class="out__text">
    Tot ce v-am spus aici cu lacrimi
    e adevăr curat şi greu
    mărturisit pe conştiinţă
    şi-n Numele lui Dumnezeu

    Nu-mi lepădaţi nici o frîntură
    din tot ce spun acum şi scriu
    că tot ce nu-nţelegeţi astăzi
    o să-nţelegeţi mai tîrziu.
    </pre>
    <div
      @click="goBack"
      class="out-next">
      <svg
        class="icon"
        :fill="theme.icon2"
        height="24" width="24">
        <use xlink:href="#iconNext"></use>
      </svg>
    </div>
  </v-touch>
</template>

<script>
export default {
  name: 'inceput',
  props: ['theme'],
  data () {
    return {
    }
  },
  created () {
    window.addEventListener('keyup', this.keyboardNavPoezie)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyboardNavPoezie)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    keyboardNavPoezie (e) {
      const searchFocus = this.$store.state.searchFocused
      if (e.key === 'ArrowRight' && !searchFocus) {
        this.goBack()
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"

.out
  display flex
  flex-direction column
  align-items center
  justify-content center
  cursor default
  @media (min-width $breakpointMobileSmall + 1px)
    padding 40px

.out__text
  margin 1em 0
  font-family $font1
  font-size 1.5em
  font-weight normal
  line-height 1.3
  white-space pre-wrap
  @media (max-width $breakpointMobileSmall)
    font-size 1.1em

.out-prev
.out-next
  height 24px
  opacity 0.5
  @media (min-width $breakpointMobileSmall + 1px)
    position absolute
    top 50%
    transform translateY(50%)

.out-next
  right 20px

</style>
