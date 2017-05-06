import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const sidebarRightToggled = localStorage.getItem('sidebarRightToggled') === 'true' || false
const selectedTheme = +localStorage.getItem('selectedTheme') || 0
const selectedFontSize = +localStorage.getItem('selectedFontSize') || 1
const filtersOpen = localStorage.getItem('filtersOpen') === 'true' || false
const checkedFilters = JSON.parse(localStorage.getItem('checkedFilters')) || ['checkboxTitle', 'checkboxVerses']

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled,
    selectedTheme,
    selectedFontSize,
    folderListLoaded: false,
    selectedPoem: {},
    selectEnabled: false,
    copyConfirmShown: false,
    moreOpen: false,
    fullBook: false,
    poemsSnapped: false,
    searchFocused: false,
    filtersOpen,
    checkedFilters
  },
  mutations: {
    toggleSidebarLeft (state) {
      const scrollLinkIntoView = () => {
        const route = document.querySelector('.router-link-active')
        const routeParent = route.parentElement.parentElement.firstElementChild
        if (routeParent && !routeParent.checked) routeParent.click()
        route.scrollIntoView()
      }
      const waitForToggle = new Promise((resolve) => {
        state.sidebarLeftToggled = !state.sidebarLeftToggled
        resolve()
      })
      waitForToggle.then(() => {
        if (state.sidebarLeftToggled) {
          if (!state.folderListLoaded) {
            let waitForLoad = setInterval(() => {
              if (state.folderListLoaded) {
                clearInterval(waitForLoad)
                scrollLinkIntoView()
              }
            }, 100)
          } else scrollLinkIntoView()
        }
      })
      localStorage.setItem('sidebarLeftToggled', state.sidebarLeftToggled)
    },
    toggleSidebarRight (state) {
      state.sidebarRightToggled = !state.sidebarRightToggled
      localStorage.setItem('sidebarRightToggled', state.sidebarRightToggled)
    },
    closeSidebars (state) {
      state.sidebarRightToggled = false
      state.sidebarLeftToggled = false
    },
    setSelectedTheme (state, theme) {
      state.selectedTheme = theme
      localStorage.setItem('selectedTheme', theme)
    },
    zoomReset (state) {
      state.selectedFontSize = 1
      localStorage.setItem('selectedFontSize', 1)
    },
    zoomOut (state) {
      if (state.selectedFontSize > 0.9) {
        state.selectedFontSize -= 0.06
        localStorage.setItem('selectedFontSize', state.selectedFontSize)
      }
    },
    zoomIn (state) {
      if (state.selectedFontSize < 1.1) {
        state.selectedFontSize += 0.06
        localStorage.setItem('selectedFontSize', state.selectedFontSize)
      }
    },
    setFolderListLoaded (state) {
      state.folderListLoaded = true
    },
    setSelectedPoem (state, poem) {
      state.selectedPoem = poem
    },
    setSelectEnabled (state, boolean) {
      state.selectEnabled = boolean
    },
    toggleCopyConfirm (state) {
      state.copyConfirmShown = true
      setTimeout(() => {
        state.copyConfirmShown = false
      }, 3000)
    },
    toggleMore (state) {
      state.moreOpen = !state.moreOpen
    },
    setFullBook (state) {
      state.fullBook = true
    },
    setPoemsSnapped (state) {
      state.poemsSnapped = true
    },
    handleSearchFocus (state, bool) {
      state.searchFocused = bool
    },
    toggleFilters (state) {
      state.filtersOpen = !state.filtersOpen
      localStorage.setItem('filtersOpen', state.filtersOpen)
    },
    setCheckedFilters (state, array) {
      state.checkedFilters = array
      localStorage.setItem('checkedFilters', JSON.stringify(array))
    }
  }
})
