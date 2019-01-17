import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import { store } from './store/index'

sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
