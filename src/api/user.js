import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user?type=login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'user?type=info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user?type=logout',
    method: 'post'
  })
}
