/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/4.
 */
export default {
  NET: {
    END_POINT: 'http://localhost:8080/api/private/v1',
    API: {
      ADMIN_LOGIN: '/admin/login',
      ADMIN_LIST: '/admin/list',
      CONFIG_PRICE: '/config/price',
      UPDATE_DEFAULT_PRICE: '/config/price-default-update'
    }
  },

  ERROR: {
    ERROR_NETWORK: -10000,
    ERROR_INVALID: -1,
    ERROR_PARAM_NOT_SET: 1,
    ERROR_EXISTS: 2,
    ERROR_NOT_EXISTS: 3,
    ERROR_LOGIN_FAIL: 4,
    ERROR_WRONG_PASSWORD: 5
  },

  SYSTEM: {
    LOG_LEVEL_ERROR: 1,
    LOG_LEVEL_WARN: 2,
    LOG_LEVEL_INFO: 3,
    LOG_LEVEL_TRACE: 4,
    LOG_LEVEL_DEBUG: 5
  },

  DATA: {
    KEY_PREFIX: 'cqupt.management.admin.data.',
    KEY_COOKIE: 'cookie',
    KEY_TOKEN: 'token',
    KEY_ADMIN: 'admin'
  }
}
