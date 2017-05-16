<template>
  <aside class="sidebar-right">
    <div class="sidebar-right__inner">
      <form
        @click="focusSearch"
        @submit.prevent="submit"
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
          v-model="searchText"
          @focus="handleSearchFocus(true)"
          @blur="handleSearchFocus(false)"
          :style="{ color: theme.text3 }"
          id="searchInput"
          type="search"
          class="search-box__input"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="Caută">
      </form>
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        @swiperight="toggleSidebarRight"
        class="sidebar-right__results"
        :style="{
          backgroundColor: theme.background,
          borderColor: theme.border3
        }">
        <svg
          v-if="loaderShown"
          class="sidebar-right__loading"
          width="300" height="2" viewBox="0 0 300 2">
          <line
            :stroke="theme.accent"
            class="line"
            x1="0" y1="1" x2="300" y2="1" stroke-width="2" />
        </svg>
        <div class="sidebar-right__filters">
          <div
            :style="{
              backgroundColor: theme.background,
              borderColor: !$store.state.filtersOpen ? '' : 'transparent'
            }"
            class="sidebar-right__filters-icon-wrapper">
            <svg
              @click="toggleFilters"
              :fill="!$store.state.filtersOpen ? theme.icon2 : theme.accent"
              class="icon icon-filters"
              height="24" viewBox="0 0 24 24" width="24">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <span
              v-if="resultsInfoShown"
              class="results-info">
              {{resultsCounter}} {{resultsCounter === 1 ? 'rezultat' : 'rezultate'}} în {{resultsPoemsCounter}} {{resultsPoemsCounter === 1 ? 'poezie' : 'poezii'}} pentru "{{searchText}}"
            </span>
          </div>
          <transition name="filters">
            <div
              :style="{color: theme.text2}"
              v-if="$store.state.filtersOpen"
              class="sidebar-right__filter-wrapper">
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxTitle" id="checkboxTitle" v-model="checkedFilters">
                <label
                  @click="handleCheckTitle"
                  for="checkboxTitle">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>În titlu</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxVerses" id="checkboxVerses" v-model="checkedFilters">
                <label
                  @click="handleCheckVerses"
                  for="checkboxVerses">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>În versuri</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxWhole" id="checkboxWhole" v-model="checkedFilters">
                <label for="checkboxWhole">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Cuvinte întregi</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxCase" id="checkboxCase" v-model="checkedFilters">
                <label for="checkboxCase">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Ignoră majusculele</span>
                </label>
              </div>
              <div class="sidebar-right__filter">
                <input
                  type="checkbox"
                  value="checkboxAccents" id="checkboxAccents" v-model="checkedFilters">
                <label for="checkboxAccents">
                  <svg
                    class="icon icon-check"
                    :fill="theme.accent"
                    width="24" height="24">
                    <use class="off" xlink:href="#iconCheck"></use>
                    <use class="on" xlink:href="#iconCheckOn"></use>
                  </svg>
                  <span>Ignoră diacriticele</span>
                </label>
              </div>
            </div>
          </transition>
        </div>
        <div class="sidebar-right__results-inner">
          <div
            v-for="result in results"
            @click="handleResultClick($event, result.nr)"
            :id="`res${result.nr}`"
            class="result">
            <span class="result__nr">{{result.nr}}</span>
            <div >
              <div class="result__title" v-html="result.title"></div>
              <div
                v-for="find in result.findsInVerses"
                class="find">
                {{find}}
              </div>
            </div>
          </div>
        </div>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import { replaceAccents, mobileTap } from '../helpers'

import Loading from './Loading'

export default {
  name: 'sidebar-right',
  props: ['theme', 'poemsSnap'],
  components: {
    Loading
  },
  data () {
    return {
      checkedFilters: this.$store.state.checkedFilters,
      searchText: this.$store.state.searchText,
      results: [],
      resultsCounter: 0,
      resultsPoemsCounter: 0,
      resultsInfoShown: false,
      loaderShown: false,
      lastSelectedResult: ''
    }
  },
  methods: {
    toggleSidebarRight () {
      this.$store.commit('toggleSidebarRight')
    },
    handleSearchFocus (bool) {
      this.$store.commit('handleSearchFocus', bool)
    },
    focusSearch () {
      document.getElementById('searchInput').focus()
    },
    toggleFilters () {
      this.$store.commit('toggleFilters')
    },
    handleCheckTitle (e) {
      if (this.checkedFilters.includes('checkboxTitle') && !this.checkedFilters.includes('checkboxVerses')) e.preventDefault()
    },
    handleCheckVerses (e) {
      if (this.checkedFilters.includes('checkboxVerses') && !this.checkedFilters.includes('checkboxTitle')) e.preventDefault()
    },
    highlightResult (result, indexes) {
      let highlightedResult = result
      for (const occurence of indexes) {
        const substr = result.substring(occurence[0], occurence[1])
        highlightedResult = highlightedResult.replace(new RegExp(substr), `<span style="background-color: ${this.theme.highlight}">${substr}</span>`)
      }
      return highlightedResult
    },
    submit () {
      this.results = []
      if (this.searchText.length > 2) {
        const searchInTitle = this.checkedFilters.includes('checkboxTitle')
        const searchInVerses = this.checkedFilters.includes('checkboxVerses')
        const searchWhole = this.checkedFilters.includes('checkboxWhole')
        const searchIgnoreCase = this.checkedFilters.includes('checkboxCase')
        const searchIgnoreAccents = this.checkedFilters.includes('checkboxAccents')
        let textToSearch = this.searchText
        this.loaderShown = true
        this.resultsInfoShown = true
        this.resultsCounter = 0
        this.resultsPoemsCounter = 0
        if (searchIgnoreCase) textToSearch = textToSearch.toLowerCase()
        if (searchIgnoreAccents) textToSearch = replaceAccents(textToSearch)
        for (const [index, item] of this.poemsSnap.entries()) {
          let textToBeSearched = ''
          let textRegEx
          if (searchInTitle && !searchInVerses) textToBeSearched = item.t
          if (searchInVerses && !searchInTitle) textToBeSearched = item.s
          if (searchInTitle && searchInVerses) textToBeSearched = `${item.t} ${item.s}`
          if (searchIgnoreCase) textToBeSearched = textToBeSearched.toLowerCase()
          if (searchIgnoreAccents) textToBeSearched = replaceAccents(textToBeSearched)
          if (searchWhole) textRegEx = new RegExp(`\\b${textToSearch}\\b`, 'g')
          else textRegEx = new RegExp(textToSearch, 'g')
          if (textToBeSearched.match(textRegEx)) {
            let resultsIndexes = []
            let findsInVerses = []
            let match
            while ((match = textRegEx.exec(textToBeSearched)) !== null) {
              resultsIndexes.push([
                match.index,
                textRegEx.lastIndex
              ])
              this.resultsCounter++
            }
            this.results.push({
              title: this.highlightResult(item.t, resultsIndexes),
              nr: index + 1,
              findsInVerses
            })
            this.resultsPoemsCounter++
          }
        }
      }
      this.lastSelectedResult = 0
      this.loaderShown = false
      this.$store.commit('setSearchText', this.searchText)
    },
    handleResultClick (event, nr) {
      const route = document.getElementById(nr)
      const routeParent = route.parentElement.parentElement.firstElementChild
      if (!routeParent.checked) routeParent.click()
      route.click()
      route.scrollIntoView()
      if (this.lastSelectedResult.length) document.getElementById(this.lastSelectedResult).classList.remove('active')
      event.target.closest('.result').classList.add('active')
      this.lastSelectedResult = `res${nr}`
      mobileTap(1100, this.toggleSidebarRight)
    }
  },
  watch: {
    checkedFilters () {
      this.$store.commit('setCheckedFilters', this.checkedFilters)
    },
    searchText () {
      this.resultsInfoShown = false
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
  cursor text

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

.sidebar-right__loading
  position absolute
  top -1px
  z-index 20
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
  padding 15px 22px 12px
  border-bottom 1px solid $separatorBorderColor
  position relative
  z-index 10

.icon-filters
.icon-check
  flex-shrink 0
  margin-right 10px

.results-info
  opacity 0.5
  cursor default

.sidebar-right__filter-wrapper
  height 186px
  padding-left 22px
  padding-right 22px
  font-size 15px
  border-bottom 1px solid $separatorBorderColor
  overflow hidden

.sidebar-right__filter
  display flex
  align-items center
  margin-top 10px
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

.filters-enter-active
.filters-leave-active
  transition transform $sidebarDuration $sidebarTiming
.filters-enter
.filters-leave-to
  transform translateY(-100%)

.sidebar-right__results-inner
  flex-grow 1
  overflow-y auto

.result
  display flex
  padding 10px 15px
  font-size 14px
  border-bottom 1px solid $separatorBorderColor
  cursor pointer
  &:hover
    background-color $linkHoverBackground
  &.active
    background-color $linkSelectedBackground

.result__title
  font-size 15px

.result__nr
  flex-shrink 0
  display inline-block
  width 45px
  opacity 0.3

</style>
