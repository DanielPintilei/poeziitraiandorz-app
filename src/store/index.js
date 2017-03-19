import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    currentTheme: 1,
    selectedFile: ''
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
