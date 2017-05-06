import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Landing from 'components/Landing'
import Beginning from 'components/Beginning'
import End from 'components/End'
import Poem from 'components/Poem'

export default new Router({
  routes: [
    {
      path: '/',
      component: Landing
    },
    {
      path: '/beginning',
      component: Beginning
    },
    {
      path: '/end',
      component: End
    },
    {
      path: '/:nr-:title',
      name: 'Poem',
      component: Poem,
      props: true
    }
  ]
})
