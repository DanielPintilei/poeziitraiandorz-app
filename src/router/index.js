import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Landing from 'components/Landing'
import Poezie from 'components/Poezie'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: Landing
    },
    {
      path: '/',
      component: Landing
    },
    {
      path: '/:adresa',
      name: 'Poezie',
      component: Poezie,
      props: true
    }
  ]
})
