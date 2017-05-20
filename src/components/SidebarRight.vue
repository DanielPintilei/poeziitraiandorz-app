<template>
  <aside class="sidebar-right">
    <div class="sidebar-right__inner">
      <form
        @click="focusSearch"
        @submit.prevent="submitSearch"
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
        class="sidebar-right__main"
        :style="{
          backgroundColor: theme.background,
          borderColor: theme.border3
        }">
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
              {{resultsInfo}}
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
        <div class="sidebar-right__results" id="sidebarRightResults">
          <div
            v-for="result in results"
            @click="handleResultClick($event, result.nr)"
            :id="`res${result.nr}`"
            class="result">
            <span class="result__nr">{{result.nr}}</span>
            <div >
              <div class="result__title" v-html="result.title"></div>
              <div class="result__verses">
                <div
                  v-for="verse in result.verses"
                  v-html="verse"
                  class="result__verse">
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import { mobileTap } from '../helpers'

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
      lastSelectedResult: ''
    }
  },
  computed: {
    resultsInfo () {
      let inPoems = ' '
      if (this.resultsCounter) inPoems = ` în ${this.resultsPoemsCounter} ${this.resultsPoemsCounter === 1 ? 'poezie' : 'poezii'} `
      return `${this.resultsCounter} ${this.resultsCounter === 1 ? 'rezultat' : 'rezultate'}${inPoems}pentru "${this.searchText}"`
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
    submitSearch () {
      if (this.searchText.length > 2) {
        document.getElementById('sidebarRightResults').scrollTop = 0
        this.results = []
        const searchInTitle = this.checkedFilters.includes('checkboxTitle')
        const searchInVerses = this.checkedFilters.includes('checkboxVerses')
        const searchWhole = this.checkedFilters.includes('checkboxWhole')
        const searchIgnoreCase = this.checkedFilters.includes('checkboxCase')
        const searchIgnoreAccents = this.checkedFilters.includes('checkboxAccents')
        this.resultsInfoShown = true
        this.resultsCounter = 0
        this.resultsPoemsCounter = 0
        let textToSearch = this.searchText
        if (searchIgnoreAccents) {
          textToSearch = textToSearch
            .replace(/[aăâ]/g, '[aăâ]')
            .replace(/[AĂÂ]/g, '[AĂÂ]')
            .replace(/[iî]/g, '[iî]')
            .replace(/[IÎ]/g, '[IÎ]')
            .replace(/[sş]/g, '[sş]')
            .replace(/[SŞ]/g, '[SŞ]')
            .replace(/[tţ]/g, '[tţ]')
            .replace(/[TŢ]/g, '[TŢ]')
        }
        textToSearch = textToSearch.trim().replace(/[!?,.-]/g, '\\$&').replace(/\s/g, '\\s')
        let searchRegEx
        let searchFlags = 'g'
        if (searchIgnoreCase) searchFlags = 'ig'
        if (searchWhole) {
          const searchWholeRegExChars = 'a-zA-ZăâîşţĂÂÎŞŢ'
          searchRegEx = new RegExp(`([^${searchWholeRegExChars}]|^)(${textToSearch})(?![${searchWholeRegExChars}])`, searchFlags)
        } else searchRegEx = new RegExp(textToSearch, searchFlags)
        const incrementResultsCounter = int => { this.resultsCounter += int }
        const searchForMatches = textToBeSearched => {
          const matchesCount = (textToBeSearched.match(searchRegEx) || []).length
          if (matchesCount) incrementResultsCounter(matchesCount)
          return matchesCount
        }
        const highlightMatches = textToBeHighlighted => {
          let firstGroup = ''
          let secondGroup = '$&'
          if (searchWhole) {
            firstGroup = '$1'
            secondGroup = '$2'
          }
          return textToBeHighlighted.replace(searchRegEx, `${firstGroup}<span style="background-color: ${this.theme.highlight}">${secondGroup}</span>`)
        }
        const listVersesMatches = results => {
          let matchRegEx = /(?:\S+\s)?\S*<span([^]*?)<\/span>\S*(?:\s\S+)?/g
          let list = []
          let match
          while ((match = matchRegEx.exec(results)) !== null) list.push(match[0])
          return list
        }
        for (const [index, item] of this.poemsSnap.entries()) {
          let title = item.t
          let verses = null
          let titleResults = null
          let versesResults = null
          if (searchInTitle) titleResults = searchForMatches(item.t)
          if (searchInVerses) versesResults = searchForMatches(item.s)
          if (titleResults) title = highlightMatches(item.t)
          if (versesResults) verses = listVersesMatches(highlightMatches(item.s))
          if (titleResults || versesResults) {
            this.results.push({
              nr: index + 1,
              title,
              verses
            })
            this.resultsPoemsCounter++
          }
        }
        this.lastSelectedResult = 0
        this.$store.commit('setSearchText', this.searchText)
      }
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

.sidebar-right__main
  position relative
  flex-grow: 1
  display flex
  flex-direction column
  border-left 1px solid
  overflow-x hidden

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

.sidebar-right__results
  flex-grow 1
  overflow-x hidden
  overflow-y auto
  &::-webkit-scrollbar
    background-color $scrollbarTrackBackgroundDarker
  &::-webkit-scrollbar-thumb
    background-color $scrollbarThumbBackgroundDarker

.result
  display flex
  padding 7px 15px
  font-size 14px
  border-bottom 1px solid $separatorBorderColor
  cursor pointer
  &:hover
    background-color $linkHoverBackground
  &.active
    background-color $linkSelectedBackground

.result__title
  font-size 15px
  line-height 1.2

.result__nr
  flex-shrink 0
  display inline-block
  width 45px
  height 20px
  opacity 0.3

.result__verses
  padding-left 7px
  opacity 0.8

.result__verse
  padding-top 5px
  line-height 1.2

</style>
