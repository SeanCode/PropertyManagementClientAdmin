/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/3.
 */
import Const from './const'
import Log from './Log'
import Vue from 'vue'

export default {
  COMMON: {
    login: function (name, password) {
      return post(Const.NET.API.ADMIN_LOGIN, {
        name: name,
        password: password
      })
    }
  }
}

function post (api, data) {
  var url = Const.NET.END_POINT + api
  Log.d(url + transformObjectToUrlencodedData(data))

  return Vue.http.post(url, transformObjectToUrlencodedData(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(function (response) {
    if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
      return Promise.reject(JSON.stringify(response.data))
    }
    return response.data
  }, function (error) {
    Log.e(error)
    return {
      code: Const.ERROR.ERROR_NETWORK,
      response: error
    }
  })
}

function transformObjectToUrlencodedData (obj) {
  var p = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }
  }
  return p.join('&')
}

