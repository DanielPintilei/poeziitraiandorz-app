<template>
  <aside class="sidebar-right">
    <div class="sidebar-right__inner">
      <div
        @click="focusSearch"
        class="search-box"
        :style="{
          borderLeftColor: theme.border2,
          borderBottomColor: theme.border,
          backgroundColor: theme.navbar
        }">
        <svg
          :fill="$store.state.searchFocused ? theme.accent : theme.icon"
          class="search-box__icon"
          height="24" width="24">
          <use xlink:href="#iconSearch"></use>
        </svg>
        <input
          @focus="handleSearchFocus(true)"
          @blur="handleSearchFocus(false)"
          :style="{ color: theme.text3 }"
          id="searchInput"
          type="search"
          class="search-box__input"
          placeholder="Caută">
      </div>
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        @swiperight="sidebarRightToggle"
        class="sidebar-right__results"
        :style="{
          backgroundColor: theme.background,
          borderColor: theme.border3
        }">
        <svg
          class="sidebar-right__loading"
          width="300" height="2" viewBox="0 0 300 2">
          <line
            :stroke="theme.accent"
            class="line"
            x1="0" y1="1" x2="300" y2="1" stroke-width="2" />
        </svg>
        <div class="sidebar-right__filters">
          <div
            class="sidebar-right__filters-icon-wrapper">
            <svg
              @click="toggleFilters"
              :fill="!$store.state.filtersOpen ? theme.icon2 : theme.accent"
              class="icon icon-filters"
              height="24" viewBox="0 0 24 24" width="24">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </div>
          <transition name="filters">
              <!--:style="{ borderColor: theme.border3 }"-->
            <div
              :style="{color: theme.text2}"
              v-if="$store.state.filtersOpen"
              class="sidebar-right__filter-wrapper">
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxTitlu" id="checkboxTitlu" v-model="filtersCheck">
                <label
                  @click="handleCheckTitlu"
                  for="checkboxTitlu">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Titlu</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxVersuri" id="checkboxVersuri" v-model="filtersCheck">
                <label
                  @click="handleCheckVersuri"
                  for="checkboxVersuri">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Versuri</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxCase" id="checkboxCase" v-model="filtersCheck">
                <label for="checkboxCase">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Exact</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxDiacritice" id="checkboxDiacritice" v-model="filtersCheck">
                <label for="checkboxDiacritice">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Majuscule</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxFuzzy" id="checkboxFuzzy" v-model="filtersCheck">
                <label for="checkboxFuzzy">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Diacritice</span>
                </label>
              </div>
            </div>
          </transition>
        </div>
        <div class="sidebar-right__results-inner">
        </div>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'sidebar-right',
  props: ['theme', 'cuprinsCaieteRef'],
  components: {
    Loading
  },
  data () {
    return {
      filtersCheck: this.$store.state.filtersCheck
    }
  },
  methods: {
    sidebarRightToggle () {
      this.$store.commit('toggleSidebarRight')
    },
    handleSearchFocus (n) {
      this.$store.commit('handleSearchFocus', n)
    },
    focusSearch () {
      document.getElementById('searchInput').focus()
    },
    toggleFilters () {
      this.$store.commit('toggleFilters')
    },
    commitFilters () {
      this.$store.commit('setFiltersCheck', this.filtersCheck)
    },
    handleCheckTitlu (e) {
      if (this.filtersCheck.includes('checkboxTitlu') && !this.filtersCheck.includes('checkboxVersuri')) e.preventDefault()
      else this.commitFilters()
    },
    handleCheckVersuri (e) {
      if (this.filtersCheck.includes('checkboxVersuri') && !this.filtersCheck.includes('checkboxTitlu')) e.preventDefault()
      else this.commitFilters()
    }
  },
  watch: {
    filtersCheck () {
      this.commitFilters()
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
  background-color transparent
  border none
  outline none
  overflow visible
  -webkit-appearance textfield
  outline-offset -2px
  &::placeholder
    opacity 0.5
    :focus&
    :active&
      opacity 0
  &::-webkit-search-cancel-button
  &::-webkit-search-decoration
    -webkit-appearance none

.search-box__icon
  opacity $iconOpacity

.sidebar-right__results
  position relative
  flex-grow: 1
  display flex
  flex-direction column
  padding-bottom 12px
  border-left 1px solid
  overflow-x hidden
  overflow-y auto

.sidebar-right__loading
  position absolute
  top -1px
.line
  stroke-dasharray 300
  stroke-dashoffset 300
  animation searchLoading 2s infinite ease-in
@keyframes searchLoading
  to
    stroke-dashoffset -300

.sidebar-right__filters
  flex-shrink 0

.sidebar-right__filters-icon-wrapper
  display flex
  padding 15px 22px 0

.icon-filters
.icon-check
  margin-right 10px

.sidebar-right__filter-wrapper
  height 186px
  padding-left 22px
  padding-right 22px
  font-size 15px
  overflow hidden
  // border-bottom 1px solid

.sidebar-right__filter
  display flex
  align-items center
  margin-top 10px
  // &:last-child
  //   padding-bottom 15px
  input
    display none
    &:checked + label svg .off
      display none
    &:not(:checked) + label svg .on
      display none
  label
    display flex
    align-items center
    width 100%
    &:active svg
      transform scale(0.9)
    &:hover
      cursor pointer
      & svg
        opacity 1

.sidebar-right__results-inner
  flex-grow 1
  padding-top 15px

.filters-enter-active
.filters-leave-active
  transition height $sidebarDuration $sidebarTiming, opacity $sidebarDuration $sidebarTiming
.filters-enter
.filters-leave-to
  height 0
  opacity 0

</style>
