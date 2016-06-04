/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/4.
 */

import Api from '../core/api'
import Log from '../core/Log'

export default {
  login (name, password) {
    return Api.COMMON.login(name, password).then(function (response) {
      window.router.go('/')
    }, function (error) {
      window.alert(error)
      Log.e(error)
    })
  }
}
