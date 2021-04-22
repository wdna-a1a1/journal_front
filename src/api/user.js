import request from '@/utils/axios'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: 'user/info',
    method: 'post',
    data: { token }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function refreshToken (data) {
  return request({
    url: '/user/refresh-token',
    method: 'post',
    data,
    headers: { 'showLoading': false, 'noRetry': false }
  })
}
