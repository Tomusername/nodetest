// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  //error:'../static/loading-balls.svg',
  loading:'../static/loading-balls.svg'
})

Vue.config.productionTip = false

import request from './api/request'
Vue.prototype.$http = request

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
