import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const sidebarRightToggled = localStorage.getItem('sidebarRightToggled') === 'true' || false
const selectedTheme = +localStorage.getItem('selectedTheme') || 0
const selectedFontSize = +localStorage.getItem('selectedFontSize') || 1

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
    moreOpen: false
    // searchFocused: false,
    // fullBook: false,
    // poeziiSnap: false,
    // filtersOpen: true,
    // filtersCheck: ['checkboxTitlu', 'checkboxVersuri']
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
            let wait = setInterval(() => {
              if (state.folderListLoaded) {
                clearInterval(wait)
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
    }
    // handleSearchFocus (state, n) {
    //   state.searchFocused = n
    // },
    // toggleFilters (state) {
    //   state.filtersOpen = !state.filtersOpen
    // },
    // setFiltersCheck (state, n) {
    //   state.filtersCheck = n
    // },
    // setPoeziiSnap (state, n) {
    //   state.poeziiSnap = true
    // },
    // setFullBook (state) {
    //   state.fullBook = true
    // },
  }
})
