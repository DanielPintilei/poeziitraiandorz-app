import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    currentTheme: 0,
    selectedCaiete: [],
    lastSelectedPoezie: null,
    sortCuprinsAZ: false,
    // lastRoute: '/'
    defaultFontSize: 1,
    lastFontSize: 1,
    selectEnabled: false
  },
  getters: {
    getSidebarLeftToggled: state => {
      return state.sidebarLeftToggled
    },
    getSidebarRightToggled: state => {
      return state.sidebarRightToggled
    },
    getSelectedCaiete: state => {
      return state.selectedCaiete
    },
    // getSelectedPoezie: state => {
    //   return state.selectedPoezie
    // },
    getThemes: state => {
      return state.themes
    },
    getCurrentTheme: state => {
      return state.currentTheme
    },
    getSelectEnabled: state => {
      return state.selectEnabled
    }
    // getLastRoute: state => {
    //   return state.lastRoute
    // }
  },
  mutations: {
    toggleSidebarLeft (state) {
      state.sidebarLeftToggled = !state.sidebarLeftToggled
    },
    toggleSidebarRight (state) {
      state.sidebarRightToggled = !state.sidebarRightToggled
    },
    closeSidebars (state) {
      state.sidebarRightToggled = false
      state.sidebarLeftToggled = false
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
    }
  }
})
