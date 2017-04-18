import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    currentTheme: 0,
    selectedCaiete: [],
    selectedPoezie: null,
    sortCuprinsAZ: false,
    defaultFontSize: 1,
    selectEnabled: false,
    showCopyConfirm: false,
    moreOpen: false,
    searchFocused: false
  },
  getters: {

  },
  mutations: {
    toggleSidebarLeft (state) {
      const route = document.querySelector('.router-link-active')
      const routeParent = route.parentElement.parentElement.firstElementChild
      const waitToggle = new Promise((resolve) => {
        state.sidebarLeftToggled = !state.sidebarLeftToggled
        resolve()
      })
      waitToggle.then(() => {
        if (state.sidebarLeftToggled) {
          if (routeParent && !routeParent.checked) routeParent.click()
          route.scrollIntoView()
        }
      })
    },
    toggleSidebarRight (state) {
      state.sidebarRightToggled = !state.sidebarRightToggled
    },
    closeSidebars (state) {
      state.sidebarRightToggled = false
      state.sidebarLeftToggled = false
    },
    toggleMore (state) {
      state.moreOpen = !state.moreOpen
    },
    setSelectedCaiete (state, n) {
      state.selectedCaiete = n
    },
    setSelectedPoezie (state, n) {
      state.selectedPoezie = n
    },
    setSortCuprinsAZ (state, n) {
      state.sortCuprinsAZ = n
    },
    setSortCuprinsAZInvert (state, n) {
      state.sortCuprinsAZInvert = n
    },
    setSelectedTheme (state, n) {
      state.currentTheme = n
    },
    setSelectEnabled (state, n) {
      state.selectEnabled = n
    },
    toggleCopyConfirm (state) {
      state.showCopyConfirm = true
      setTimeout(function () {
        state.showCopyConfirm = false
      }, 3000)
    },
    handleSearchFocus (state, n) {
      state.searchFocused = n
    }
  }
})
