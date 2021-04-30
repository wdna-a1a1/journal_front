const TokenKey = 'refresh_token'

export function getRefreshToken () {
  return localStorage.getItem(TokenKey)
}

export function setRefreshToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeRefreshToken () {
  return localStorage.removeItem(TokenKey)
}
