import Cookies from 'js-cookie'

const TokenKey = 'journal_front_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
