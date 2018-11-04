import request from '@/utils/request'

export function statisticsInfo(query) {
  return request({
    url: '/statistics/info',
    method: 'get',
    params: query
  })
}

export function statisticsWeekInfo(query) {
  return request({
    url: '/statistics/weekInfo',
    method: 'get',
    params: query
  })
}

export function statisticsOrderTypeInfo(query) {
  return request({
    url: '/statistics/orderTypeInfo',
    method: 'get',
    params: query
  })
}

export function statisticsEndOrderMoonInfo(query) {
  return request({
    url: '/statistics/endOrderMoonInfo',
    method: 'get',
    params: query
  })
}

export function statisticsEndOrderYearInfo(query) {
  return request({
    url: '/statistics/endOrderYearInfo',
    method: 'get',
    params: query
  })
}

export function customers(query) {
  return request({
    url: '/statistics/customers',
    method: 'get',
    params: query
  })
}

export function lableGoods(query) {
  return request({
    url: '/statistics/lableGoods',
    method: 'get',
    params: query
  })
}

export function zrSaleGoods(query) {
  return request({
    url: '/statistics/zrSaleGoods',
    method: 'get',
    params: query
  })
}
