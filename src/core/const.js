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
      CONFIG_UPDATE_DEFAULT_PRICE: '/config/price-default-update',
      CONFIG_SAVE_SPECIFIC_PRICE: '/config/price-specific-save',
      DEPARTMENT_LIST: '/department/list',
      DEPARTMENT_TREE_LIST: '/department/tree-list',
      DEPARTMENT_NAME_UPDATE: '/department/name-update',
      DEPARTMENT_ADD: '/department/add',
      DEPARTMENT_REMOVE: '/department/remove',
      INSTITUTION_LIST: '/institution/list',
      INSTITUTION_ADD: '/institution/add',
      INSTITUTION_DETAIL: '/institution/detail',
      INSTITUTION_INFO_UPDATE: '/institution/info-update',
      INSTITUTION_DELETE: '/institution/delete',
      USER_LIST_BY_DEPARTMENT: '/user/list-by-department',
      USER_DETAIL: '/user/detail',
      USER_INFO_UPDATE: '/user/info-update',
      USER_DELETE: '/user/delete',
      NODE_CHILDREN: '/node/children',
      NODE_DETAIL: '/node/detail',
      NODE_INFO_UPDATE: '/node/info-update',
      NODE_TREE_ROOT: '/node/tree-root',
      METER_NORMAL_LIST: '/meter/normal-list',
      METER_CHECK_LIST: '/meter/check-list',
      METER_CHILDREN: '/meter/children',
      METER_ADD_NORMAL: '/meter/add-normal',
      METER_ADD_CHECK: '/meter/add-check',
      METER_INFO_UPDATE: '/meter/info-update',
      METER_REMOVE: '/meter/remove',
      METER_DETAIL: '/meter/detail',
      METER_SET_AS_CHILD: '/meter/set-as-child',
      NODE_OWNER_NODE: '/node-owner/node',
      NODE_OWNER_OWNER: '/node-owner/owner',
      NODE_OWNER_ADD: '/node-owner/add',
      NODE_OWNER_INVALID: '/node-owner/invalid'
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
  },

  TYPE: {
    OWNER_TYPE_USER: 1,
    OWNER_TYPE_INSTITUTION: 2
  }
}
