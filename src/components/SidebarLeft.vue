<template>
  <aside class="sidebar-left">
    <div class="sidebar-left__inner">
      <div
        class="sidebar-left__top"
        :style="{
          borderRightColor: theme.border2,
          borderBottomColor: theme.border,
          backgroundColor: theme.navbar
        }">
        <svg
          @click="sidebarLeftToggle"
          class="icon icon-cuprins"
          :fill="theme.accent"
          width="24" height="24">
          <use xlink:href="#iconList"></use>
        </svg>
        <div
          @click="scrollLinkIntoView"
          class="sort-cuprins">
          <input
            v-model="sortCuprinsAZ"
            type="checkbox"
            id="checkboxSortCuprins"
            class="sort-cuprins__checkbox">
          <label
            for="checkboxSortCuprins"
            class="sort-cuprins__label">
            <svg
              :fill="!sortCuprinsAZ ? theme.icon : theme.accent"
              class="icon icon-sort-cuprins"
              height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm.75.75h22.5v22.5H.75z" fill="none"/>
              <path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/>
            </svg>
          </label>
        </div>
      </div>
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        @swipeleft="sidebarLeftToggle"
        class="sidebar-left__cuprins"
        :style="{
          color: theme.text2,
          backgroundColor: theme.background,
          borderColor: theme.border3
        }">
        <div
          v-if="!sortCuprinsAZ"
          v-for="(caiet, index) in cuprinsCaieteRef"
          class="caiet">
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
              :fill="theme.icon2"
              class="icon-caret"
              width="24" height="24">
              <use xlink:href="#iconCaret"></use>
            </svg>
            <svg
              class="icon-caiet"
              :fill="theme.accent"
              width="24" height="24">
              <use xlink:href="#iconCaiet"></use>
            </svg>
            {{caiet.t}}
          </label>
          <div :style="{ color: theme.text2 }" class="poezii">
            <router-link
              v-for="poezie in caiet.p"
              :id="`${poezie.n}`"
              :to="{
                name: 'Poezie',
                params: {
                  nr: +poezie.n,
                  titlu: formatTitlu(poezie.t)
                }
              }">
              <span
                @click="tapPoezie"
                class="link-span">
                <span>{{poezie.n}}</span>
                <span>{{poezie.t}}</span>
              </span>
            </router-link>
          </div>
        </div>
        <div
          v-if="sortCuprinsAZ"
          class="cuprinsAZ">
          <router-link
            v-for="poezie in cuprinsPoeziiRef"
            :id="+poezie['.key']+1"
            :to="{
              name: 'Poezie',
              params: {
                nr: +poezie.n,
                titlu: formatTitlu(poezie.t),
                order: +poezie['.key']+1
              }
            }">
            <span
              @click="tapPoezie"
              class="link-span">
              <span>{{poezie.n}}</span>
              <span>{{poezie.t}}</span>
            </span>
          </router-link>
        </div>
        <loading class="loading" :color="theme.accent"></loading>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'sidebar-left',
  props: ['theme', 'cuprinsCaieteRef', 'cuprinsPoeziiRef'],
  components: {
    Loading
  },
  data () {
    return {
      selectedCaiete: this.$store.state.selectedCaiete,
      sortCuprinsAZ: this.$store.state.sortCuprinsAZ
    }
  },
  methods: {
    formatTitlu (titlu) {
      return titlu.replace(/\s+/g, '-').replace(/[ăâ]+/g, 'a').replace(/[ĂÂ]+/g, 'A').replace(/[î]+/g, 'i').replace(/[Î]+/g, 'I').replace(/[ș]+/g, 's').replace(/[Ș]+/g, 'S').replace(/[ț]+/g, 't').replace(/[Ț]+/g, 'T').replace(/[^\w-]+/g, '')
    },
    sidebarLeftToggle () {
      this.$store.commit('toggleSidebarLeft')
    },
    tapPoezie () {
      const tapMQ = window.matchMedia('(max-width: 900px)')
      if (tapMQ.matches) {
        this.sidebarLeftToggle()
      }
    },
    scrollLinkIntoView () {
      const route = document.querySelector('.router-link-active')
      const routeParent = route.parentElement.parentElement.firstElementChild
      if (routeParent && !routeParent.checked) routeParent.click()
      route.scrollIntoView()
    }
  },
  watch: {
    selectedCaiete () {
      this.$store.commit('setSelectedCaiete', this.selectedCaiete)
    },
    sortCuprinsAZ () {
      this.$store.commit('setSortCuprinsAZ', this.sortCuprinsAZ)
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
  z-index 5
  @media (max-width $breakpointMobile)
    position absolute
    top 0
    bottom 0
    left 0
    z-index 20
    will-change transform
  @media (min-width $breakpointMobile + 1px)
    will-change width

.sidebar-left__inner
  flex-grow 1
  display flex
  flex-direction column
  width $sidebarLeftWidth

.sidebar-left__top
  flex-shrink 0
  display flex
  align-items center
  height $navbarHeight
  padding-left 20px
  border-right 1px solid
  border-bottom 1px solid

.icon-cuprins
  opacity 1
  margin-right 7px
  @media (min-width $breakpointMobile + 1px)
    pointer-events none

$iconSortHeight = 24px
.sort-cuprins
  height $iconSortHeight

.sort-cuprins__checkbox
  display none
  &:checked + .sort-cuprins__label .icon-sort-cuprins
    opacity 1

.sort-cuprins__label
  height $iconSortHeight
  margin-left 5px
  cursor pointer

.icon-sort-cuprins
  &:active
    transform scale(0.9)

.sidebar-left__cuprins
  position relative
  flex-grow 1
  padding-top 4px
  padding-bottom 12px
  border-right 1px solid
  overflow auto

a
  text-decoration none
  line-height 1.2

.caiet__checkbox
  display none
  &:not(:checked) + .caiet__titlu + .poezii
    display none
  &:checked + .caiet__titlu
    & .icon-caret
      transform rotate(45deg)
      opacity 1
    & .icon-caiet
      opacity 1

.caiet__titlu
  display flex
  padding 10px 12px 8px
  align-items center
  line-height 100%
  cursor pointer
  &:active .icon-caiet
    transform scale(0.9)
  &:hover
    background-color $linkHoverBackground
    .icon-caret
    .icon-caiet
      opacity 1

.icon-caret
  width 22px
  margin-right -7px
  opacity $iconOpacity

.icon-caiet
  margin-left 6px
  margin-right 4px
  opacity $iconOpacity

.link-span
  display flex
  padding 5px 20px 6px 18px
  &:hover
    background-color $linkHoverBackground
  & span:first-child
    flex-shrink 0
    width 40px
    opacity 0.3
  .router-link-active &
    background-color $linkSelectedBackground
    &:hover
      background-color $linkSelectedBackground
    & span:first-child
      opacity 0.5

.loading
  .caiet + &
  .cuprinsAZ + &
    display none

</style>
