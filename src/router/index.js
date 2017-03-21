import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Poezie from 'components/Poezie'

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/:id',
      name: 'Poezie',
      component: Poezie
    }
  ]
})
