<template>
  <aside class="sidebar-right">
    <div class="sidebar-right__inner">
      <div
        class="search-box"
        :style="{
          borderLeftColor: theme.borderColor2,
          borderBottomColor: theme.borderColor,
          backgroundColor: theme.navbarColor
        }">
        <input
          id="searchInput"
          type="search"
          class="search-box__input"
          placeholder="Caută">
        <svg
          :fill="theme.iconColor"
          class="search-box__icon"
          height="24" viewBox="0 0 24 24" width="24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        @swiperight="sidebarRightToggle"
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
        <loading :color="theme.accentColor"></loading>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import Loading from './Loading'

import { store } from '../store/index'

export default {
  name: 'sidebar-right',
  store,
  props: ['theme', 'cuprinsCaieteRef'],
  components: {
    Loading
  },
  data () {
    return {
    }
  },
  methods: {
    sidebarRightToggle () {
      store.commit('toggleSidebarRight')
    }
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
  z-index 5
  @media (max-width $breakpointMobile)
    position absolute
    top 0
    bottom 0
    right 0
    z-index 20
    will-change transform
  @media (min-width $breakpointMobile + 1px)
    will-change width

.sidebar-right__inner
  flex-grow 1
  display flex
  flex-direction column
  width $sidebarRightWidth

.search-box
  flex-shrink 0
  display flex
  align-items center
  height $navbarHeight
  padding-left 20px
  padding-right 20px
  border-left 1px solid
  border-bottom 1px solid

.search-box__input
  order 1
  flex-grow 1
  margin-left 12px
  align-self stretch
  font-size 15px
  color #fff
  background-color transparent
  border none
  outline none
  overflow visible
  -webkit-appearance textfield
  outline-offset -2px
  &::-webkit-search-cancel-button
  &::-webkit-search-decoration
    -webkit-appearance none

  &:focus
  &:active
    & + .search-box__icon
      opacity 1

.search-box__icon
  opacity $iconOpacity

.sidebar-right__filters
  position relative
  flex-grow: 1
  padding-top 4px
  padding-bottom 12px
  border-left 1px solid
  overflow auto

</style>
