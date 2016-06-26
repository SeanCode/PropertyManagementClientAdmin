/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/3.
 */
import Const from './const'
import Log from './log'
import Data from './data'
import Util from './util'
import Vue from 'vue'

export default {
  COMMON: {
    login: function (name, password) {
      var hash = 'Basic ' + Util.Base64.encode(name + ':' + password)
      return post(Const.NET.API.ADMIN_LOGIN, {
        name: name,
        password: password
      }, {Authorization: hash}, true)
    }
  },
  ADMIN: {
    getAdminList: function () {
      return get(Const.NET.API.ADMIN_LIST)
    }
  },
  CONFIG: {
    getPrice: function (year, month) {
      return post(Const.NET.API.CONFIG_PRICE, {
        year: year,
        month: month
      })
    },
    updateDefaultPrice: function (water, ele, gas) {
      return post(Const.NET.API.CONFIG_UPDATE_DEFAULT_PRICE, {
        water: water,
        ele: ele,
        gas: gas
      })
    },
    saveSpecificPrice: function (year, month, water, ele, gas) {
      return post(Const.NET.API.CONFIG_SAVE_SPECIFIC_PRICE, {
        year: year,
        month: month,
        water: water,
        ele: ele,
        gas: gas
      })
    }
  },
  DEPARTMENT: {
    getList: function (rootId) {
      return post(Const.NET.API.DEPARTMENT_LIST, {
        root_id: rootId
      })
    },
    getTreeList: function (rootId) {
      return post(Const.NET.API.DEPARTMENT_TREE_LIST, {
        root_id: rootId
      })
    },
    updateName: function (id, name) {
      return post(Const.NET.API.DEPARTMENT_NAME_UPDATE, {
        id: id,
        name: name
      })
    },
    add: function (parentId, name) {
      return post(Const.NET.API.DEPARTMENT_ADD, {
        parent_id: parentId,
        name: name
      })
    },
    remove: function (id) {
      return post(Const.NET.API.DEPARTMENT_REMOVE, {
        id: id
      })
    }
  },
  INSTITUTION: {
    getInstitutionList: function () {
      return post(Const.NET.API.INSTITUTION_LIST)
    },
    addInstitution: function (name, people, contact, description, remark, code) {
      return post(Const.NET.API.INSTITUTION_ADD, {
        name: name,
        people: people,
        contact: contact,
        description: description,
        remark: remark,
        code: code
      })
    },
    deleteInstitution: function (id) {
      return post(Const.NET.API.INSTITUTION_DELETE, {
        id: id
      })
    },
    updateInstitutionInfo: function (id, name, people, contact, description, remark, code) {
      return post(Const.NET.API.INSTITUTION_INFO_UPDATE, {
        id: id,
        name: name,
        people: people,
        contact: contact,
        description: description,
        remark: remark,
        code: code
      })
    }
  },
  USER: {
    getUserListByDepartment: function (departmentId) {
      return post(Const.NET.API.USER_LIST_BY_DEPARTMENT, {
        department_id: departmentId
      })
    }
  },
  NODE: {
    getChildren: function (parentId) {
      return post(Const.NET.API.NODE_CHILDREN, {
        parent_id: parentId
      })
    },
    getNodeTreeRoot: function () {
      return post(Const.NET.API.NODE_TREE_ROOT)
    }
  }
}

function post (api, data, requestHeaders, raw) {
  var url = Const.NET.END_POINT + api
  Log.d(url + '?' + transformObjectToUrlencodedData(data))

  return Vue.http.post(url, transformObjectToUrlencodedData(data), {
    headers: configurePostHeaders(requestHeaders)
  }).then(function (response) {
    if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
      return Promise.reject(JSON.stringify(response.data))
    }
    return raw ? response : response.data.data
  }, function (error) {
    Log.e(error)
    return error
  })
}

function get (api, params, requestHeaders, raw) {
  var url = Const.NET.END_POINT + api
  Log.d(url + '?' + transformObjectToUrlencodedData(params))

  return Vue.http.get(url, {}, {
    params: params,
    headers: configureGetHeaders(requestHeaders)
  }).then(function (response) {
    if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
      return Promise.reject(JSON.stringify(response.data))
    }
    return raw ? response : response.data.data
  }, function (error) {
    Log.e(error)
    return error
  })
}

function transformObjectToUrlencodedData (obj) {
  var p = []
  if (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      }
    }
  }
  return p.join('&')
}

function configureGetHeaders (requestHeaders) {
  if (!requestHeaders) {
    requestHeaders = {}
  }
  if (!requestHeaders.hasOwnProperty('Authorization')) {
    requestHeaders['Authorization'] = 'Basic ' + Data.getToken()
  }
  return requestHeaders
}

function configurePostHeaders (requestHeaders) {
  if (!requestHeaders) {
    requestHeaders = {}
  }
  requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
  if (!requestHeaders.hasOwnProperty('Authorization')) {
    requestHeaders['Authorization'] = 'Basic ' + Data.getToken()
  }
  return requestHeaders
}

