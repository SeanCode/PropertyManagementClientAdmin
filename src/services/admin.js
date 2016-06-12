/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/12.
 */

import Core from '../core/core'

export default {
  getAdminList () {
    return Core.Api.ADMIN.getAdminList().then(function (response) {
      Core.Log.d(response)
      return response
    }, function (error) {
      window.alert(error)
      Core.Log.e(error)
      return error
    })
  }
}
