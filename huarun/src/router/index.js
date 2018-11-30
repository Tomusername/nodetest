import Vue from 'vue'
import Router from 'vue-router'
import panel from '@/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'panel',
      component: panel
    }
  ]
})
