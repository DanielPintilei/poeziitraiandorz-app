import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    currentTheme: 0,
    fontSize: 1,
    selectEnabled: false,
    showCopyConfirm: false,
    moreOpen: false,
    // searchFocused: false,
    selectedCaiete: [],
    // sortCuprinsAZ: false,
    cuprinsCaieteSnap: false,
    // fullBook: false,
    poezieSnap: {}
    // poeziiSnap: false,
    // filtersOpen: true,
    // filtersCheck: ['checkboxTitlu', 'checkboxVersuri']
  },
  // getters: {
  // },
  mutations: {
    toggleSidebarLeft (state) {
      const scrollLinkIntoView = () => {
        const route = document.querySelector('.router-link-active')
        const routeParent = route.parentElement.parentElement.firstElementChild
        if (routeParent && !routeParent.checked) routeParent.click()
        route.scrollIntoView()
      }
      const waitToggle = new Promise((resolve) => {
        state.sidebarLeftToggled = !state.sidebarLeftToggled
        resolve()
      })
      waitToggle.then(() => {
        if (state.sidebarLeftToggled) {
          if (!state.cuprinsCaieteSnap) {
            let wait = setInterval(() => {
              if (state.cuprinsCaieteSnap) {
                clearInterval(wait)
                scrollLinkIntoView()
              }
            }, 100)
          } else scrollLinkIntoView()
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
    // toggleSortCuprinsAZ (state, n) {
    //   state.sortCuprinsAZ = n
    // },
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
    // handleSearchFocus (state, n) {
    //   state.searchFocused = n
    // },
    // toggleFilters (state) {
    //   state.filtersOpen = !state.filtersOpen
    // },
    // setFiltersCheck (state, n) {
    //   state.filtersCheck = n
    // },
    setCuprinsCaieteSnap (state, n) {
      state.cuprinsCaieteSnap = true
    },
    // setPoeziiSnap (state, n) {
    //   state.poeziiSnap = true
    // },
    // setFullBook (state) {
    //   state.fullBook = true
    // },
    setPoezieSnap (state, n) {
      state.poezieSnap = n
    }
  }
})
