import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export default new Vuex.Store({
export const store = new Vuex.Store({
  state: {
    sidebarLeftToggled: true,
    sidebarRightToggled: true,
    themeColor: '#dcbf8c',
    themeBackgroundColor: '#232323',
    themeIconColor: '#777'
  },
  getters: {
    getSidebarLeftToggled: state => {
      return state.sidebarLeftToggled
    },
    getSidebarRightToggled: state => {
      return state.sidebarRightToggled
    }
  },
  mutations: {
    toggleSidebarLeft (state) {
      state.sidebarLeftToggled = !state.sidebarLeftToggled
    },
    toggleSidebarRight (state) {
      state.sidebarRightToggled = !state.sidebarRightToggled
    }
  }
})
