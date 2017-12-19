import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const contentVersion = 2
if (+localStorage.getItem('contentVersion') !== contentVersion && navigator.onLine) {
  localStorage.removeItem('folderListDownloaded')
  localStorage.removeItem('poemsDownloaded')
}
const sidebarLeftToggled = localStorage.getItem('sidebarLeftToggled') === 'true' || false
const sidebarRightToggled = localStorage.getItem('sidebarRightToggled') === 'true' || false
const selectedTheme = +localStorage.getItem('selectedTheme') || 0
const selectedFontSize = +localStorage.getItem('selectedFontSize') || 1
const folderListDownloaded = localStorage.getItem('folderListDownloaded') === 'true' || false
const poemsDownloaded = localStorage.getItem('poemsDownloaded') === 'true' || false
const searchText = localStorage.getItem('searchText') || ''
const filtersOpen = localStorage.getItem('filtersOpen') === 'true' || false
const checkedFilters = JSON.parse(localStorage.getItem('checkedFilters')) || ['checkboxTitle', 'checkboxVerses', 'checkboxWhole', 'checkboxCase', 'checkboxAccents']

export const store = new Vuex.Store({
  state: {
    contentVersion,
    sidebarLeftToggled,
    sidebarRightToggled,
    selectedTheme,
    selectedFontSize,
    folderListDownloaded,
    selectedPoem: {},
    selectEnabled: false,
    copyConfirmShown: false,
    moreOpen: false,
    fullBook: poemsDownloaded,
    poemsDownloaded,
    searchFocused: false,
    searchText,
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
          if (!state.folderListDownloaded) {
            let waitForLoad = setInterval(() => {
              if (state.folderListDownloaded) {
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
      state.sidebarLeftToggled = false
      localStorage.setItem('sidebarLeftToggled', false)
      state.sidebarRightToggled = false
      localStorage.setItem('sidebarRightToggled', false)
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
    setFolderListDownloaded (state) {
      state.folderListDownloaded = true
      localStorage.setItem('folderListDownloaded', true)
      localStorage.setItem('contentVersion', state.contentVersion)
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
    setPoemsDownloaded (state) {
      state.poemsDownloaded = true
      localStorage.setItem('poemsDownloaded', true)
    },
    handleSearchFocus (state, bool) {
      state.searchFocused = bool
    },
    setSearchText (state, str) {
      localStorage.setItem('searchText', str)
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
