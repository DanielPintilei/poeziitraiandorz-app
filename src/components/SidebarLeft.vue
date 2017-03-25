<template>
  <aside class="sidebar-left">
    <div class="sidebar-left__inner">
      <div
        class="sidebar-left__top"
        :style="{
          borderRightColor: theme.borderColor2,
          borderBottomColor: theme.borderColor,
          backgroundColor: theme.navbarColor
        }">
        <div class="sidebar-left__title">
          <svg
            class="icon-cuprins"
            :fill="theme.iconColor"
            width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/>
            <path d="M0 0h24v24H0V0z" fill="none"/>
          </svg>
          <span>Cuprins</span>
        </div>
        <div class="sort-cuprins">
          <input
            type="checkbox"
            id="checkboxSortCuprins"
            class="sort-cuprins__checkbox">
          <label
            for="checkboxSortCuprins"
            class="sort-cuprins__label sort-cuprins__label--check">
            <svg
              :fill="theme.iconColor"
              class="icon-sort-cuprins"
              height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm.75.75h22.5v22.5H.75z" fill="none"/>
              <path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/>
            </svg>
          </label>
          <input
            type="checkbox"
            id="checkboxDirectionCuprins"
            class="sort-cuprins__checkbox">
          <label
            for="checkboxDirectionCuprins"
            class="sort-cuprins__label">
            <svg
              :fill="theme.iconColor"
              class="icon-sort-cuprins"
              height="24" viewBox="0 0 24 24" width="24">
              <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </label>
        </div>
      </div>
      <div
        class="sidebar-left__cuprins"
        :style="{
          backgroundColor: theme.backgroundColor2,
          borderColor: theme.borderColor2
        }">
        <div v-for="(caiet, index) in caieteRef" class="caiet">
          <input
            type="checkbox"
            :id="`caiet${index}`"
            :value="index"
            v-model="selectedCaiete"
            class="caiet__checkbox">
          <label
            :for="`caiet${index}`"
            class="caiet__titlu">
            <svg
              :fill="theme.iconColor"
              class="icon-arrow"
              width="24" height="24" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
            <svg
              class="icon-caiet"
              :fill="theme.iconColor"
              width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
            </svg>
            {{caiet.titlu}}
          </label>
          <div class="poezii">
            <router-link
              v-for="poezie in caiet.poezii"
              :to="{
                name: 'Poezie',
                params: {
                  adresa: `${poezie.nr}-${poezie.titlu.replace(/\s+/g, '-')}`,
                  titlu: poezie.titlu,
                  strofe:poezie.strofe
                }
              }">
              <span
                @click="setSelectedPoezie(poezie.nr)"
                :class="{selected: poezie.nr === selectedPoezie}"
                class="poezie">
                <span>{{poezie.nr}}</span>
                <span>{{poezie.titlu}}</span>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { store } from '../store/index'

export default {
  name: 'sidebar-left',
  store,
  props: ['theme', 'caieteRef'],
  data () {
    return {
      selectedCaiete: store.state.selectedCaiete
    }
  },
  computed: {
    selectedPoezie () {
      return store.getters.getSelectedPoezie
    }
  },
  methods: {
    setSelectedPoezie (poezie) {
      store.commit('setSelectedPoezie', poezie)
    }
  },
  watch: {
    selectedCaiete () {
      store.commit('setSelectedCaiete', this.selectedCaiete)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../variables"

.sidebar-left
  flex-shrink 0
  display flex
  flex-direction column
  width $sidebarLeftWidth
  overflow hidden
  will-change width
  z-index 2
  @media (max-width $breakpointMobile)
    position absolute
    top 0
    bottom 0
    left 0
    z-index 2

.sidebar-left__inner
  flex-grow 1
  display flex
  flex-direction column
  width $sidebarLeftWidth

.sidebar-left__top
  flex-shrink 0
  display flex
  align-items center
  justify-content space-between
  height $navbarHeight
  padding-left 20px
  padding-right 20px
  border-right 1px solid
  border-bottom 1px solid

.sidebar-left__title
  display flex

.icon-cuprins
  margin-right 7px
  opacity $iconHoverOpacity

$iconSortHeight = 24px
.sort-cuprins
  height $iconSortHeight

.sort-cuprins__checkbox
  display none
  &:checked + .sort-cuprins__label--check .icon-sort-cuprins
    opacity 1
  &:not(:checked) + .sort-cuprins__label--check + .sort-cuprins__checkbox + .sort-cuprins__label
    display none

.sort-cuprins__label
  height $iconSortHeight
  margin-left 5px
  cursor pointer

.icon-sort-cuprins
  opacity $iconHoverOpacity

.sidebar-left__cuprins
  flex-grow 1
  padding-top 4px
  padding-bottom 12px
  border-right 1px solid
  overflow auto
  &::-webkit-scrollbar
    width: 8px
    background-color transparent
  &::-webkit-scrollbar-track
    background-color $scrollbarTrackBackground
  &::-webkit-scrollbar-thumb
    background-color $scrollbarThimbBackground
    border-radius 4px

.caiet
  a
    text-decoration none
    line-height 1.6

.caiet__checkbox
  display none
  &:not(:checked) + .caiet__titlu + .poezii
    display none
  &:checked + .caiet__titlu .icon-arrow
    transform rotate(-45deg)

.caiet__titlu
  display flex
  padding 10px 12px 8px
  align-items center
  line-height 100%
  cursor pointer
  &:hover
    background-color $poezieHoverBackground

.icon-arrow
  width 22px
  margin-right -7px
  transform rotate(-90deg)

.icon-caiet
  margin-left 6px
  margin-right 4px

.poezie
  display flex
  padding-right 20px
  padding-left 18px
  &:hover
    background-color $poezieHoverBackground
  & span:first-child
    flex-shrink 0
    width 40px
    opacity 0.3

.selected
  background-color $poezieSelectedBackground
  &:hover
    background-color $poezieSelectedBackground
  & span:first-child
    opacity 0.5

</style>
