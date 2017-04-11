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
        height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
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
