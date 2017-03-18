import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: true,
    sidebarRightToggled: true,
    themes: [
      {
        themeColor: '',
        textColor: '',
        logoColor: '',
        navbarColor: '',
        borderColor: '',
        backgroundColor: '',
        iconColor: '',
        iconColor2: ''
      }
    ],
    currentTheme: 0,
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
      return state.themes[state.currentTheme]
    },
    getCurrentThemeIndex: state => {
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
    setLoadedThemes (state, themesRef) {
      state.themes = themesRef
    },
    setSelectedTheme (state, n) {
      state.currentTheme = n
    }
  }
})
