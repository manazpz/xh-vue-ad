import request from '@/utils/request'

export function querySmsList(query) {
  return request({
    url: '/sys/smsList',
    method: 'get',
    params: query
  })
}

export function updateSms(params) {
  return request({
    url: '/sys/updateSms',
    method: 'post',
    data: params
  })
}

export function createSms(params) {
  return request({
    url: '/sys/insertSms',
    method: 'post',
    data: params
  })
}
