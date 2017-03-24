import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: true,
    sidebarRightToggled: false,
    currentTheme: 1,
    selectedCaiete: [],
    selectedPoezie: 1,
    lastRoute: '/'
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
    getSelectedPoezie: state => {
      return state.selectedPoezie
    },
    getThemes: state => {
      return state.themes
    },
    getCurrentTheme: state => {
      return state.currentTheme
    },
    getLastRoute: state => {
      return state.lastRoute
    }
  },
  mutations: {
    toggleSidebarLeft (state) {
      state.sidebarLeftToggled = !state.sidebarLeftToggled
    },
    toggleSidebarRight (state) {
      state.sidebarRightToggled = !state.sidebarRightToggled
    },
    setSelectedCaiete (state, n) {
      state.selectedCaiete = n
    },
    setSelectedPoezie (state, n) {
      state.selectedPoezie = n
    },
    setSelectedTheme (state, n) {
      state.currentTheme = n
    }
  }
})
