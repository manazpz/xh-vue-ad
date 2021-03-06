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

export function insertLogistics(params) {
  return request({
    url: '/bf/order/insertLogistics',
    method: 'POST',
    data: params
  })
}

export function orderReturnList(query) {
  return request({
    url: '/bf/order/orderReturnList',
    method: 'get',
    params: query
  })
}

export function updataOrderReturn(params) {
  return request({
    url: '/bf/order/updataOrderReturn',
    method: 'POST',
    data: params
  })
}

