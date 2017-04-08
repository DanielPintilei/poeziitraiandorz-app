import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    currentTheme: 1,
    selectedCaiete: [],
    lastSelectedPoezie: null,
    sortCuprinsAZ: false,
    // lastRoute: '/'
    defaultFontSize: 1,
    lastFontSize: 1,
    selectEnabled: false,
    showCopyConfirm: false
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
    getCurrentTheme: state => {
      return state.currentTheme
    },
    getSelectEnabled: state => {
      return state.selectEnabled
    },
    getShowCopyConfirm: state => {
      return state.showCopyConfirm
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
    },
    toggleCopyConfirm (state) {
      state.showCopyConfirm = true
      setTimeout(function () {
        state.showCopyConfirm = false
      }, 4000)
    }
  }
})
