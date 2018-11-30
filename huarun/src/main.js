// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './components/api/request'

import base from './components/api/base'
Vue.use(base);
import vPage from 'v-page';


// Vue.http.options.emulateJSON = true;
Vue.prototype.$http = request
Vue.use(vPage);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
