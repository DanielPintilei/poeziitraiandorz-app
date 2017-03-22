import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: true,
    sidebarRightToggled: false,
    currentTheme: 1,
    selectedFile: '',
    lastRoute: '/'
  },
  getters: {
    getSidebarLeftToggled: state => {
      return state.sidebarLeftToggled
    },
    getSidebarRightToggled: state => {
      return state.sidebarRightToggled
    },
    getSelectedFile: state => {
      return state.selectedFile
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
    setSelectedSidebarFile (state) {
      state.selectedFile = ''
    },
    setSelectedTheme (state, n) {
      state.currentTheme = n
    }
  }
})
