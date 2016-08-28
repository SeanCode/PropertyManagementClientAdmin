import Vue from 'vue'
import { configRouter } from './config/routes'
import Core from './core/core'
require('es6-promise').polyfill()

var VueRouter = require('vue-router')
var VueResource = require('vue-resource')
var VueTables = require('vue-tables')
global.jQuery = require('jquery')
var $ = global.jQuery
window.$ = $

// install router
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueTables.client)

// create router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})

// configure router
configRouter(router)

// boostrap the app
const app = Vue.extend(require('./App.vue'))
router.start(app, '#app')

$.ajaxSetup({
  headers: {
    Authorization: 'Basic ' + Core.Data.getToken()
  },
  beforeSend: function (evt, xhr) {
    if (Core.Config.IS_DEBUG) {
      xhr.url = xhr.url.replace(Core.Const.NET.END_POINT_RELEASE, Core.Const.NET.END_POINT_DEBUG)
    }
    Core.Log.d(xhr.url)
  }
})

// just for debugging
window.router = router
