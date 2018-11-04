import request from '@/utils/request'

export function orderType(query) {
  return request({
    url: '/bf/statistics/orderType',
    method: 'get',
    params: query
  })
}

export function zrSaleGoods(query) {
  return request({
    url: '/bf/statistics/zrSaleGoods',
    method: 'get',
    params: query
  })
}

export function zrStatus(query) {
  return request({
    url: '/bf/statistics/zrStatus',
    method: 'get',
    params: query
  })
}
