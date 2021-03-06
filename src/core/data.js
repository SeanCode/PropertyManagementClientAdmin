/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/3.
 */
import Store from 'store'
import Const from './const'

export default {
  set: set,
  get: get,
  setPath: setPath,
  getPath: getPath,
  setToken: setToken,
  getToken: getToken,
  setAdmin: setAdmin,
  getAdmin: getAdmin,
  getAdminName: getAdminName,
  setRecordTime: setRecordTime,
  getRecordTime: getRecordTime,
  isGuest: isGuest,
  logout: logout,
  getAll: getAll,
  clear: clear,
  getEmptyUser: getEmptyUser
}

//  cache data
var adminData
var tokenData
var pathData
var recordTime // 上次抄表时间

function getKey (key) {
  return Const.DATA.KEY_PREFIX + key
}

function get (key) {
  key = getKey(key)
  return Store.get(key)
}

function set (key, value) {
  key = getKey(key)
  return Store.set(key, value)
}

function setPath (path) {
  pathData = path
}

function getPath () {
  if (pathData) {
    return pathData
  }
  return ''
}

function setToken (token) {
  tokenData = token
  set(Const.DATA.KEY_TOKEN, token)
}

function getToken () {
  if (!tokenData) {
    tokenData = get(Const.DATA.KEY_TOKEN)
  }
  return tokenData
}

function setAdmin (admin) {
  adminData = admin
  set(Const.DATA.KEY_ADMIN, admin)
}

function getAdmin () {
  if (!adminData) {
    adminData = get(Const.DATA.KEY_ADMIN)
  }
  return adminData
}

function getAdminName () {
  return getAdmin()['username']
}

function setRecordTime (time) {
  recordTime = time
  set(Const.DATA.KEY_RECORD_TIME, time)
}

function getRecordTime () {
  if (!recordTime) {
    recordTime = get(Const.DATA.KEY_RECORD_TIME)
  }
  // 默认当天的时间戳
  if (!recordTime) {
    recordTime = parseInt(new Date().getTime() / 1000, 10)
  }
  return recordTime
}

function isGuest () {
  return !getToken()
}

function logout () {
  setToken(undefined)
  setAdmin(undefined)
}

function getAll () {
  return Store.getAll()
}

function clear () {
  tokenData = undefined
  adminData = undefined
  Store.clear()
}

function getEmptyUser () {
  return {
    'id': 0,
    'name': '',
    'department': '',
    'phone': '',
    'school_card': '',
    'id_card': '',
    'important': '',
    'title': '',
    'remark': ''
  }
}
