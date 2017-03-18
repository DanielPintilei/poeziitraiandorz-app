import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const themes = [
  {
    themeColor: '#dcbf8c',
    textColor: '#000',
    logoColor: '#dcbf8c',
    navbarColor: '#fff',
    borderColor: '#dcbf8c',
    backgroundColor: '#fff',
    iconColor: '#000',
    iconColor2: '#ccc'
  },
  {
    themeColor: '#707070',
    textColor: '#FFECB3',
    logoColor: '#fff',
    navbarColor: '#303030',
    borderColor: '#707070',
    backgroundColor: '#303030',
    iconColor: '#fff',
    iconColor2: '#ccc'
  }
]

// export default new Vuex.Store({
export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: true,
    sidebarRightToggled: true,
    themes,
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
