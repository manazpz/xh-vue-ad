import request from '@/utils/request'

export function shopList(query) {
  return request({
    url: '/shop/list',
    method: 'get',
    params: query
  })
}

export function shopDelete(params) {
  return request({
    url: '/shop/delete',
    method: 'post',
    data: params
  })
}

export function shopUpdate(params) {
  return request({
    url: '/shop/update',
    method: 'post',
    data: params
  })
}
