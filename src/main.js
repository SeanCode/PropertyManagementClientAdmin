import Vue from 'vue'
var VueRouter = require('vue-router')
var VueResource = require('vue-resource')
import { configRouter } from './config/routes'
require('es6-promise').polyfill()

// install router
Vue.use(VueRouter)
Vue.use(VueResource)

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  linkActiveClass: 'active'
})

// configure router
configRouter(router)

// boostrap the app
const app = Vue.extend(require('./App.vue'))
router.start(app, '#app');
(function () {
  Vue.http.interceptors.push({

    request: function (request) {
      console.log(request.headers)
      return request
    },

    response: function (response) {
      return response
    }

  })
})()

// just for debugging
window.router = router
