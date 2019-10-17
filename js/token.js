import Cookies from 'js-cookie'

const key = 'access_token'

export function getToken () {
  return Cookies.get(key)
}

export function setToken (token, options = {}) {
  return Cookies.set(key, token, options)
}

export function removeToken () {
  return Cookies.remove(key)
}
