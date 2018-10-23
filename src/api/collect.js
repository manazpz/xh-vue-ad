import request from '@/utils/request'

export function collectList(query) {
  return request({
    url: '/collect/list',
    method: 'get',
    params: query
  })
}
