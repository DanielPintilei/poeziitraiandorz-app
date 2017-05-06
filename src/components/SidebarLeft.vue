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
          @click="toggleSidebarLeft"
          class="icon icon-list"
          :fill="theme.accent"
          width="24" height="24">
          <use xlink:href="#iconList"></use>
        </svg>
        <!--<div
          @click="handleScrollSortedLinkIntoView"
          class="sort-list">
          <input
            v-model="sortCuprinsAZ"
            type="checkbox"
            id="checkboxSortCuprins"
            class="sort-list__checkbox">
          <label
            for="checkboxSortCuprins"
            class="sort-list__label">
            <svg
              :fill="!sortCuprinsAZ ? theme.icon : theme.accent"
              class="icon icon-sort-list"
              height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm.75.75h22.5v22.5H.75z" fill="none"/>
              <path d="M14.94 4.66h-4.72l2.36-2.36zm-4.69 14.71h4.66l-2.33 2.33zM6.1 6.27L1.6 17.73h1.84l.92-2.45h5.11l.92 2.45h1.84L7.74 6.27H6.1zm-1.13 7.37l1.94-5.18 1.94 5.18H4.97zm10.76 2.5h6.12v1.59h-8.53v-1.29l5.92-8.56h-5.88v-1.6h8.3v1.26l-5.93 8.6z"/>
            </svg>
          </label>
        </div>-->
      </div>
      <v-touch
        :swipe-options="{ direction: 'horizontal'}"
        @swipeleft="toggleSidebarLeft"
        class="sidebar-left__list"
        :style="{
          color: theme.text2,
          backgroundColor: theme.background,
          borderColor: theme.border3
        }">
          <!--v-if="!sortCuprinsAZ"-->
        <div
          v-for="(folder, index) in folderListSnap"
          class="folder">
          <input
            type="checkbox"
            :id="`folder${index}`"
            :value="index"
            v-model="selectedFolders"
            class="folder__checkbox">
          <label
            :for="`folder${index}`"
            class="folder__title">
            <svg
              :fill="theme.icon2"
              class="icon-caret"
              width="24" height="24">
              <use xlink:href="#iconCaret"></use>
            </svg>
            <svg
              class="icon-folder"
              :fill="theme.accent"
              width="24" height="24">
              <use xlink:href="#iconCaiet"></use>
            </svg>
            {{folder.t}}
          </label>
          <div :style="{ color: theme.text2 }" class="poems">
            <router-link
              v-for="poem in folder.p"
              :id="`${poem.n}`"
              :to="{
                name: 'Poem',
                params: {
                  nr: +poem.n,
                  title: formatTitle(poem.t)
                }
              }">
              <span
                @click="tapPoemLink"
                class="link-span">
                <span class="link-span__nr">{{poem.n}}</span>
                <span>{{poem.t}}</span>
              </span>
            </router-link>
          </div>
        </div>
        <!--<div
          v-if="sortCuprinsAZ && listPoemsSort"
          class="listAZ">
          <router-link
            v-for="(poem, index) in listPoemsSort"
            :id="index+1"
            :to="{
              name: 'Poem',
              params: {
                nr: +poem.n,
                title: formatTitle(poem.t),
                order: index+1
              }
            }">
            <span
              @click="tapPoemLink"
              class="link-span">
              <span class="link-span__nr">{{poem.n}}</span>
              <span>{{poem.t}}</span>
            </span>
          </router-link>
        </div>-->
        <loading class="loading" :color="theme.accent"></loading>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'sidebar-left',
  // props: ['theme', 'folderListSnap', 'listPoemsSort'],
  props: ['theme', 'folderListSnap'],
  components: {
    Loading
  },
  data () {
    return {
      selectedFolders: this.$store.state.lastSelectedFolder
      // selectedFolders: [+localStorage.getItem('selectedFolders')] || 0
      // sortCuprinsAZ: this.$store.state.sortCuprinsAZ
    }
  },
  methods: {
    formatTitle (title) {
      return title.replace(/\s+/g, '-').replace(/[ăâ]+/g, 'a').replace(/[ĂÂ]+/g, 'A').replace(/[î]+/g, 'i').replace(/[Î]+/g, 'I').replace(/[ș]+/g, 's').replace(/[Ș]+/g, 'S').replace(/[ț]+/g, 't').replace(/[Ț]+/g, 'T').replace(/[^\w-]+/g, '')
    },
    toggleSidebarLeft () {
      this.$store.commit('toggleSidebarLeft')
    },
    tapPoemLink () {
      const tapMQ = window.matchMedia('(max-width: 1100px)')
      if (tapMQ.matches) {
        this.toggleSidebarLeft()
      }
    }
    // scrollLinkIntoView () {
    //   const route = document.querySelector('.router-link-active')
    //   const routeParent = route.parentElement.parentElement.firstElementChild
    //   if (routeParent && !routeParent.checked) routeParent.click()
    //   route.scrollIntoView()
    // },
    // handleScrollSortedLinkIntoView () {
    //   if (!this.listPoemsSort) {
    //     let wait = setInterval(() => {
    //       if (this.listPoemsSort) {
    //         clearInterval(wait)
    //         this.scrollLinkIntoView()
    //       }
    //     }, 100)
    //   } else this.scrollLinkIntoView()
    // }
  },
  watch: {
    selectedFolders () {
      this.$store.commit('setLastSelectedFolder', this.selectedFolders)
    }
    // sortCuprinsAZ () {
    //   this.$store.commit('toggleSortCuprinsAZ', this.sortCuprinsAZ)
    //   if (!this.$store.state.listPoemsSort) this.$emit('setCuprinsPoemsSort')
    // }
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

.icon-list
  opacity 1
  margin-right 7px
  @media (min-width $breakpointMobile + 1px)
    pointer-events none

$iconSortHeight = 24px
.sort-list
  height $iconSortHeight

.sort-list__checkbox
  display none
  &:checked + .sort-list__label .icon-sort-list
    opacity 1

.sort-list__label
  height $iconSortHeight
  margin-left 5px
  cursor pointer

.icon-sort-list
  &:active
    transform scale(0.9)

.sidebar-left__list
  position relative
  flex-grow 1
  padding-top 4px
  padding-bottom 12px
  border-right 1px solid
  overflow auto

a
  text-decoration none
  line-height 1.2

.folder__checkbox
  display none
  &:not(:checked) + .folder__title + .poems
    display none
  &:checked + .folder__title
    & .icon-caret
      transform rotate(45deg)
      opacity 1
    & .icon-folder
      opacity 1

.folder__title
  display flex
  padding 10px 12px 8px
  align-items center
  line-height 100%
  cursor pointer
  &:active .icon-folder
    transform scale(0.9)
  @media (min-width $breakpointMobile + 1px)
    &:hover
      background-color $linkHoverBackground
      .icon-caret
      .icon-folder
        opacity 1

.icon-caret
  width 22px
  margin-right -7px
  opacity $iconOpacity

.icon-folder
  margin-left 6px
  margin-right 4px
  opacity $iconOpacity

.link-span
  display flex
  padding 5px 20px 6px 18px
  @media (min-width $breakpointMobile + 1px)
    &:hover
      background-color $linkHoverBackground
  .router-link-active &
    background-color $linkSelectedBackground
    @media (min-width $breakpointMobile + 1px)
      &:hover
        background-color $linkSelectedBackground

.link-span__nr
  flex-shrink 0
  width 45px
  opacity 0.3
  .router-link-active &
    opacity 0.5

.loading
  .folder + &
  .listAZ + &
    display none

</style>
