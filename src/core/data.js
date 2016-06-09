/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/6/3.
 */
import Store from 'store'
import Const from './const'

export default {
  set: set,
  get: get,
  setToken: setToken,
  getToken: getToken,
  setAdmin: setAdmin,
  getAdmin: getAdmin,
  isGuest: isGuest,
  logout: logout,
  getAll: getAll,
  clear: clear
}

//  cache data
var adminData
var tokenData

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
