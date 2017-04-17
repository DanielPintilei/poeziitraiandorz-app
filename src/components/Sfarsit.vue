<template>
  <v-touch
    :swipe-options="{ direction: 'horizontal'}"
    @swiperight="goBack"
    class="out">
    <pre
      :style="{ color: theme.accent }"
      class="out__text">
    Slăvit să fie Domnul
    căci El ne-a dăruit
    Lumina şi-Ajutorul
    s-ajungem la sfîrşit.
    </pre>
    <div
      @click="goBack"
      class="out-prev">
      <svg
        class="icon"
        :fill="theme.icon2"
        height="24" width="24">
        <use xlink:href="#iconPrev"></use>
      </svg>
    </div>
  </v-touch>
</template>

<script>
export default {
  name: 'sfarsit',
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
      let searchFocus = document.getElementById('searchInput') === document.activeElement
      if (e.key === 'ArrowLeft' && !searchFocus) {
        this.goBack()
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../variables"

.out-prev
  left 20px

</style>
