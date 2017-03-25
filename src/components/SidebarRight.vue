<template>
  <aside class="sidebar-right">
    <div class="sidebar-right__inner">
      <div
        class="search"
        :style="{
          borderLeftColor: theme.borderColor2,
          borderBottomColor: theme.borderColor,
          backgroundColor: theme.navbarColor
        }">
        <svg
          :fill="theme.iconColor"
          class="search__icon"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <input
          type="text"
          class="search__input"
          placeholder="Caută">
      </div>
      <div
        class="sidebar-right__filters"
        :style="{
          backgroundColor: theme.backgroundColor2,
          borderColor: theme.borderColor2
        }">
        <!--<input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">{{ checked }}</label>-->

        <!--<input type="radio" id="one" value="One" v-model="picked">
        <label for="one">One</label>
        <br>
        <input type="radio" id="two" value="Two" v-model="picked">
        <label for="two">Two</label>
        <br>
        <span>Picked: {{ picked }}</span>-->
      </div>
    </div>
  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-right',
  store,
  props: ['theme'],
  methods: {
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="stylus">
@import "../variables"

.sidebar-right
  flex-shrink 0
  display flex
  flex-direction column
  width $sidebarRightWidth
  overflow hidden
  will-change width
  z-index 2
  @media (max-width $breakpointMobile)
    position absolute
    top 0
    bottom 0
    right 0
    z-index 2

.sidebar-right__inner
  flex-grow 1
  display flex
  flex-direction column
  width $sidebarRightWidth

.search
  flex-shrink 0
  display flex
  align-items center
  height $navbarHeight
  padding-left 20px
  padding-right 20px
  border-left 1px solid
  border-bottom 1px solid

.search__icon
  opacity $iconHoverOpacity

.search__input
  flex-grow 1
  padding-left 12px
  align-self stretch
  font-size 15px
  color #fff
  background-color transparent
  border none
  outline none

.sidebar-right__filters
  flex-grow: 1
  padding-top 4px
  padding-bottom 12px
  border-left 1px solid
  overflow auto

</style>
