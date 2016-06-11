/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/4.
 */

import Core from '../core/core'

export default {
  login (name, password) {
    return Core.Api.COMMON.login(name, password).then(function (response) {
      Core.Data.setAdmin(response.data.data['admin'])
      Core.Data.setToken(Core.Util.Base64.encode(name + ':' + password))
      window.router.go('/')
    }, function (error) {
      window.alert(error)
      Core.Log.e(error)
    })
  }
}
