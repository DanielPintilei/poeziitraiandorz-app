import Vue from 'vue'
import Router from 'vue-router'
import Landing from './components/Landing'
import Beginning from './components/Beginning'
import End from './components/End'
import Poem from './components/Poem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Landing,
    },
    {
      path: '/beginning',
      component: Beginning,
    },
    {
      path: '/end',
      component: End,
    },
    {
      path: '/:nr-:title',
      name: 'Poem',
      component: Poem,
      props: true,
    },
    {
      path: '*',
      component: Landing,
    },
  ],
})
