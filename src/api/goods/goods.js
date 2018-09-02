import request from '@/utils/request'

export function pushGoods(params) {
  if (params.classify) {
    if (params.data) {
      params.data.classifyId = params.classify.id
    }
  }
  return request({
    url: '/bf/goods/push',
    method: 'post',
    data: params.data
  })
}

export function goodsList(query) {
  return request({
    url: '/bf/goods/list',
    method: 'get',
    params: query
  })
}

export function warehouseGoodsDeleteRecovery(params) {
  return request({
    url: '/bf/goods/warehourseGoods/deleteRecovery',
    method: 'post',
    data: params
  })
}

export function goodsDelete(params) {
  return request({
    url: '/bf/goods/delete',
    method: 'post',
    data: params
  })
}

export function updateGoodsStock(params) {
  return request({
    url: '/bf/goods/stock/update',
    method: 'post',
    data: params
  })
}

export function upper_lower_goods(params) {
  return request({
    url: '/bf/goods/upperLower',
    method: 'post',
    data: params
  })
}

export function classifyCascade(params) {
  return request({
    url: '/bf/goods/classify/cascade',
    method: 'get'
  })
}

export function classifySpecParam(params) {
  return request({
    url: '/bf/goods/classify/specs/param/' + params,
    method: 'get'
  })
}

export function brands(params) {
  return request({
    url: '/bf/goods/brands',
    method: 'get'
  })
}
