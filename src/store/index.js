import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: true,
    sidebarRightToggled: false,
    currentTheme: 1,
    selectedCaiet: '',
    selectedPoezie: '',
    lastRoute: '/'
  },
  getters: {
    getSidebarLeftToggled: state => {
      return state.sidebarLeftToggled
    },
    getSidebarRightToggled: state => {
      return state.sidebarRightToggled
    },
    getSelectedCaiet: state => {
      return state.selectedCaiet
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
    setSelectedCaiet (state, n) {
      state.selectedCaiet = n
    },
    setSelectedPoezie (state, n) {
      state.selectedPoezie = n
    },
    setSelectedTheme (state, n) {
      state.currentTheme = n
    }
  }
})
