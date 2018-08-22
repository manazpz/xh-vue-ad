import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const RefreshKey = 'Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(RefreshKey)
}

export function setRefreshToken(refreshToken) {
  return Cookies.set(RefreshKey, refreshToken)
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshKey)
}
