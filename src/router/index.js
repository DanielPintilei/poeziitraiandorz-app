import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Landing from 'components/Landing'
import Inceput from 'components/Inceput'
import Sfarsit from 'components/Sfarsit'
import Poezie from 'components/Poezie'

export default new Router({
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/inceput',
      component: Inceput
    },
    {
      path: '/sfarsit',
      component: Sfarsit
    },
    {
      path: '/:adresa',
      name: 'Poezie',
      component: Poezie,
      props: true
    }
  ]
})
