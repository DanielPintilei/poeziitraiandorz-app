import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    currentTheme: 0,
    selectedCaiete: [],
    sortCuprinsAZ: false,
    fontSize: 1,
    selectEnabled: false,
    showCopyConfirm: false,
    moreOpen: false,
    searchFocused: false,
    cuprinsCaieteSnap: null,
    cuprinsPoeziiSnap: null,
    fullBook: false,
    poezieSnap: {},
    poeziiSnap: [],
    filtersOpen: true,
    filtersCheck: ['checkboxTitlu', 'checkboxVersuri']
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
    toggleSortCuprinsAZ (state, n) {
      state.sortCuprinsAZ = n
    },
    setSelectedTheme (state, n) {
      state.currentTheme = n
    },
    zoomReset (state) {
      state.fontSize = 1
    },
    zoomOut (state) {
      if (state.fontSize > 0.9) state.fontSize -= 0.06
    },
    zoomIn (state) {
      if (state.fontSize < 1.1) state.fontSize += 0.06
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
    },
    toggleFilters (state) {
      state.filtersOpen = !state.filtersOpen
    },
    setFiltersCheck (state, n) {
      state.filtersCheck = n
    },
    setCuprinsCaieteSnap (state, n) {
      state.cuprinsCaieteSnap = n
    },
    setCuprinsPoeziiSnap (state, n) {
      state.cuprinsPoeziiSnap = n
    },
    setFullBook (state) {
      state.fullBook = true
    },
    setPoezieSnap (state, n) {
      state.poezieSnap = n
    },
    setPoeziiSnap (state, n) {
      state.poeziiSnap = n
    }
  }
})
