/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/28.
 */
export default {
  success: success,
  error: error,
  info: info
}

function error (context, msg) {
  if (!msg) {
    msg = '发生一个未知错误'
  }
  toast(context, {
    error: msg
  })
}

function success (context, msg) {
  if (!msg) {
    msg = 'success'
  }
  toast(context, {
    success: msg
  })
}

function info (context, msg) {
  if (!msg) {
    msg = '这是一条消息'
  }
  toast(context, {
    info: msg
  })
}

function toast (context, options) {
  context.$root.$broadcast('show::toast', options)
}
