import request from '@/utils/request'

export function orderList(query) {
  return request({
    url: '/bf/order/list',
    method: 'get',
    params: query
  })
}

export function orderDetail(query) {
  return request({
    url: '/bf/order/detail',
    method: 'get',
    params: query
  })
}

export function updateOrder(params) {
  return request({
    url: '/bf/order/update',
    method: 'POST',
    data: params
  })
}

