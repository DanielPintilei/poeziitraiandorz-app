// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import router from './router'
import { store } from './store/index'
import VueTouch from 'vue-touch'
import SocialSharing from 'vue-social-sharing'

sync(store, router)

Vue.config.productionTip = false
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(SocialSharing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
