import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: { username, password }
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sys/loginOut',
    method: 'post',
    data: {}
  })
}
