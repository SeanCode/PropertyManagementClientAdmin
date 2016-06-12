import Vue from 'vue'
import { configRouter } from './config/routes'
import Core from './core/core'
require('es6-promise').polyfill()

var VueRouter = require('vue-router')
var VueResource = require('vue-resource')

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

// add interceptor
(function () {
  Vue.http.interceptors.push({

    request: function (request) {
      var headers = request.headers

      if (!request.headers.hasOwnProperty('Authorization')) {
        request.headers['Authorization'] = 'Basic ' + Core.Data.getToken()
      }
      console.log(headers)
      return request
    },

    response: function (response) {
      if (response.status !== 200) {
        Core.Log.e(response.statusText)
      }
      return response
    }

  })
})()

// just for debugging
window.router = router
