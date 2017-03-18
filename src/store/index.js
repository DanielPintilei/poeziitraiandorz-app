import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export default new Vuex.Store({
export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: false,
    sidebarRightToggled: false,
    themes: [
      {
        color: '#dcbf8c',
        backgroundColor: '#232323',
        iconColor: '#fff'
      },
      {
        color: 'aqua',
        backgroundColor: '#fff',
        iconColor: '#ccc'
      },
      {
        color: 'pink',
        backgroundColor: 'mediumseagreen',
        iconColor: 'red'
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
    setSelectedTheme (state, n) {
      state.currentTheme = n
    }
  }
})
