<template>
  <aside class="sidebar-left">
    <div class="sidebar-left__inner">
      <div
        class="sidebar-left__title"
        :style="{
          borderRightColor: theme.borderColor2,
          borderBottomColor: theme.borderColor,
          backgroundColor: theme.navbarColor
        }">
        <svg
          class="icon-cuprins"
          :fill="theme.iconColor"
          width="24" height="24" viewBox="0 0 24 24">
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <span>Cuprins</span>
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

.sidebar-left__title
  flex-shrink 0
  display flex
  align-items center
  height $navbarHeight
  padding-left 20px
  border-right 1px solid
  border-bottom 1px solid

.icon-cuprins
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
