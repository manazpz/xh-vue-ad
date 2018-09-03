import request from '@/utils/request'

export function orderList(query) {
  return request({
    url: '/order/orderList',
    method: 'get',
    params: query
  })
}

export function createClassify(params) {
  return request({
    url: '/goods/insertClassify',
    method: 'POST',
    data: params
  })
}
