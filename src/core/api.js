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
    },
    getDetail: function (id) {
      return post(Const.NET.API.INSTITUTION_DETAIL, {
        id: id
      })
    }
  },
  USER: {
    getUserListByDepartment: function (departmentId) {
      return post(Const.NET.API.USER_LIST_BY_DEPARTMENT, {
        department_id: departmentId
      })
    },
    getUserDetail: function (id) {
      return post(Const.NET.API.USER_DETAIL, {
        id: id
      })
    },
    updateUserInfo: function (id, name, username, phone, idCard, schoolCard, remark) {
      return post(Const.NET.API.USER_INFO_UPDATE, {
        id: id,
        name: name,
        username: username,
        phone: phone,
        id_card: idCard,
        school_card: schoolCard,
        remark: remark
      })
    },
    deleteUser: function (id) {
      return post(Const.NET.API.USER_DELETE, {
        id: id
      })
    },
    addUser: function (departmentId, name, username, phone, idCard, schoolCard, remark) {
      return post(Const.NET.API.USER_ADD, {
        department_id: departmentId,
        name: name,
        username: username,
        phone: phone,
        id_card: idCard,
        school_card: schoolCard,
        remark: remark
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
    },
    getNodeDetail: function (id) {
      return post(Const.NET.API.NODE_DETAIL, {
        id: id
      })
    },
    updateNodeInfo: function (id, name, code, path, type, area, price, fee, ownership, remark) {
      return post(Const.NET.API.NODE_INFO_UPDATE, {
        id: id,
        name: name,
        code: code,
        path: path,
        type: type,
        area: area,
        price: price,
        fee: fee,
        ownership: ownership,
        remark: remark
      })
    },
    addNode: function (name, parentId, code, path, type, area, price, fee, ownership, remark) {
      return post(Const.NET.API.NODE_ADD, {
        name: name,
        parent_id: parentId,
        code: code,
        path: path,
        type: type,
        area: area,
        price: price,
        fee: fee,
        ownership: ownership,
        remark: remark
      })
    },
    copyNode: function (parentId, id) {
      return post(Const.NET.API.NODE_COPY, {
        parent_id: parentId,
        id: id
      })
    },
    removeNode: function (parentId, id) {
      return post(Const.NET.API.NODE_REMOVE, {
        parent_id: parentId,
        id: id
      })
    },
    deleteNode: function (id) {
      return post(Const.NET.API.NODE_DELETE, {
        id: id
      })
    }
  },
  METER: {
    getNormalList: function (nodeId) {
      return post(Const.NET.API.METER_NORMAL_LIST, {
        node_id: nodeId
      })
    },
    getCheckList: function (nodeId) {
      return post(Const.NET.API.METER_CHECK_LIST, {
        node_id: nodeId
      })
    },
    getChildren: function (nodeId) {
      return post(Const.NET.API.METER_CHILDREN, {
        node_id: nodeId
      })
    },
    remove: function (id, nodeId) {
      return post(Const.NET.API.METER_REMOVE, {
        id: id,
        node_id: nodeId
      })
    },
    replace: function (id, name, code, rate, begin, end, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
      return post(Const.NET.API.METER_REPLACE, {
        id: id,
        name: name,
        code: code,
        rate: rate,
        begin: begin,
        end: end,
        nameplate: nameplate,
        manufacturers: manufacturers,
        purchaser: purchaser,
        cost: cost,
        buy_time: buyTime,
        product_time: productTime,
        remark: remark
      })
    },
    setAsChild: function (id, nodeId, parentId) {
      return post(Const.NET.API.METER_SET_AS_CHILD, {
        id: id,
        child_node_id: nodeId,
        parent_id: parentId
      })
    },
    addNormal: function (name, nodeId, code, type, rate, begin, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
      return post(Const.NET.API.METER_ADD_NORMAL, {
        name: name,
        node_id: nodeId,
        code: code,
        type: type,
        rate: rate,
        begin: begin,
        nameplate: nameplate,
        manufacturers: manufacturers,
        purchaser: purchaser,
        cost: cost,
        buy_time: buyTime,
        product_time: productTime,
        remark: remark
      })
    },
    addCheck: function (name, parentId, code, type, rate, begin, nameplate, manufacturers, purchaser, cost, buyTime, productTime, remark) {
      return post(Const.NET.API.METER_ADD_CHECK, {
        name: name,
        parent_id: parentId,
        code: code,
        type: type,
        rate: rate,
        begin: begin,
        nameplate: nameplate,
        manufacturers: manufacturers,
        purchaser: purchaser,
        cost: cost,
        buy_time: buyTime,
        product_time: productTime,
        remark: remark
      })
    },
    getMeterDetail: function (id) {
      return post(Const.NET.API.METER_DETAIL, {
        id: id
      })
    },
    updateMeterInfo: function (id, name, code, remark) {
      return post(Const.NET.API.METER_INFO_UPDATE, {
        id: id,
        name: name,
        code: code,
        remark: remark
      })
    }
  },
  NODE_OWNER: {
    addNodeOwner: function (nodeId, ownerId, ownerType) {
      return post(Const.NET.API.NODE_OWNER_ADD, {
        node_id: nodeId,
        owner_id: ownerId,
        owner_type: ownerType
      })
    },
    invalidNodeOwner: function (nodeId, ownerId, ownerType) {
      return post(Const.NET.API.NODE_OWNER_INVALID, {
        node_id: nodeId,
        owner_id: ownerId,
        owner_type: ownerType
      })
    },
    getNodeByOwner: function (ownerId, ownerType) {
      return post(Const.NET.API.NODE_OWNER_NODE, {
        owner_id: ownerId,
        owner_type: ownerType
      })
    },
    getOwnerByNode: function (nodeId) {
      return post(Const.NET.API.NODE_OWNER_OWNER, {
        node_id: nodeId
      })
    }
  },
  RECORD: {
    input: function (meterId, value, time, reader, remark) {
      return post(Const.NET.API.RECORD_INPUT, {
        meter_id: meterId,
        value: value,
        time: time,
        reader: reader,
        remark: remark
      })
    },
    getTempList: function (nodeId, year, month) {
      return post(Const.NET.API.RECORD_TEMP_LIST, {
        node_id: nodeId,
        year: year,
        month: month
      })
    },
    getLastRecord: function (meterId) {
      return post(Const.NET.API.RECORD_LAST, {
        meter_id: meterId
      })
    },
    updateRecord: function (id, end, reader, remark) {
      return post(Const.NET.API.RECORD_UPDATE, {
        id: id,
        end: end,
        reader: reader,
        remark: remark
      })
    },
    getPendingList: function (page) {
      return post(Const.NET.API.RECORD_LIST_PENDING, {
        page: page
      })
    },
    getCheckedList: function (page, all) {
      return post(Const.NET.API.RECORD_LIST_CHECKED, {
        page: page,
        all: all
      })
    },
    checkRecord: function (id, status) {
      return post(Const.NET.API.RECORD_CHECK, {
        id: id,
        status: status
      })
    }
  }
}

function post (api, data, requestHeaders, raw) {
  var url = Const.NET.END_POINT + api
  Log.d(url + '?' + transformObjectToUrlencodedData(data))

  return Vue.http.post(url, transformObjectToUrlencodedData(data), {
    headers: configurePostHeaders(requestHeaders)
  }).then((response) => {
    if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
      return Promise.reject(response.data)
    }
    return raw ? response : response.data.data
  }, function (error) {
    Log.e(error)
    return Promise.reject(error)
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
        if (obj[key] === undefined) {
          obj[key] = ''
        }
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

