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
        <div
          v-for="(folder, index) in folderListSnap"
          class="folder">
          <input
            type="radio"
            :id="`folder${index}`"
            name="folder"
            class="folder__radio">
          <label
            @click="handleFolderClick(`folder${index}`)"
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
              :key="`${poem.n}`"
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
        <loading class="loading" :color="theme.accent"></loading>
      </v-touch>
    </div>
  </aside>
</template>

<script>
import Loading from './Loading'

export default {
  name: 'sidebar-left',
  props: ['theme', 'folderListSnap'],
  components: {
    Loading
  },
  methods: {
    formatTitle (title) {
      return title.replace(/\s+/g, '-').replace(/[ăâ]+/g, 'a').replace(/[ĂÂ]+/g, 'A').replace(/[î]+/g, 'i').replace(/[Î]+/g, 'I').replace(/[ș]+/g, 's').replace(/[Ș]+/g, 'S').replace(/[ț]+/g, 't').replace(/[Ț]+/g, 'T').replace(/[^\w-]+/g, '')
    },
    toggleSidebarLeft () {
      this.$store.commit('toggleSidebarLeft')
    },
    handleFolderClick (folder) {
      const folderById = document.getElementById(folder)
      if (folderById.checked) {
        setTimeout(() => {
          folderById.checked = false
        }, 10)
      } else {
        setTimeout(() => {
          folderById.nextElementSibling.scrollIntoView()
        }, 10)
      }
    },
    tapPoemLink () {
      const tapMQ = window.matchMedia('(max-width: 1100px)')
      if (tapMQ.matches) {
        this.toggleSidebarLeft()
      }
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

.icon-list
  opacity 1
  margin-right 7px
  @media (min-width $breakpointMobile + 1px)
    pointer-events none

$iconSortHeight = 24px
.sort-list
  height $iconSortHeight

.sort-list__radio
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

.folder__radio
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
