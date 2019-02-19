import request from '@/utils/request'
import { dataToFormData } from '@/utils/common'

export function pushOldGoods(params) {
  if (params.classify) {
    if (params.data) {
      params.data.classifyId = params.classify.id
    }
  }
  var formData = new FormData()
  dataToFormData(formData, params.data)
  if (params.data.fileList) {
    for (var i = 0; i < params.data.fileList.length; i++) {
      formData.append('files', params.data.fileList[i].raw)
    }
  } else {
    formData.append('files', null)
  }
  formData.append('path', 'goods')
  return request({
    url: '/bf/goods/old/push',
    method: 'post',
    data: formData
  })
}

export function pushNewGoods(params) {
  if (params.classify) {
    if (params.data) {
      params.data.classifyId = params.classify.id
    }
  }
  var formData = new FormData()
  dataToFormData(formData, params.data)
  if (params.data.fileList) {
    for (var i = 0; i < params.data.fileList.length; i++) {
      formData.append('files', params.data.fileList[i].raw)
    }
  } else {
    formData.append('files', null)
  }
  formData.append('path', 'goods')
  return request({
    url: '/bf/goods/new/push',
    method: 'post',
    data: formData
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
    method: 'get',
    params: params
  })
}

export function goodsClassifyCascade(params) {
  return request({
    url: '/bf/goods/classify/cascade/' + params,
    method: 'get'
  })
}

export function classifySpecParam(params) {
  return request({
    url: '/bf/goods/classify/specs/param/' + params,
    method: 'get'
  })
}

export function classifyBrandParam(params) {
  return request({
    url: '/bf/goods/classify/brand/param/' + params,
    method: 'get'
  })
}

export function brands(params) {
  return request({
    url: '/bf/goods/brands',
    method: 'get',
    params: params
  })
}

export function lables(params) {
  return request({
    url: '/bf/goods/lables',
    method: 'get',
    params: params
  })
}

export function addGoodsLable(params) {
  return request({
    url: '/bf/goods/addGoodsLable',
    method: 'post',
    data: params
  })
}

export function deleteGoodsLable(params) {
  return request({
    url: '/bf/goods/deleteGoodsLable',
    method: 'post',
    data: params
  })
}

export function forecastList(params) {
  return request({
    url: '/bf/goods/forecastList',
    method: 'get',
    params: params
  })
}

export function getClassifyTree(query) {
  return request({
    url: '/bf/goods/treeList',
    method: 'get',
    params: query
  })
}

export function createForecast(params) {
  return request({
    url: '/bf/goods/createForecast',
    method: 'post',
    data: params
  })
}

export function deleteForecast(params) {
  return request({
    url: '/bf/goods/deleteForecast',
    method: 'post',
    data: params
  })
}

export function updateForecast(params) {
  return request({
    url: '/bf/goods/updateForecast',
    method: 'post',
    data: params
  })
}

export function instertLable(params) {
  return request({
    url: '/bf/goods/instertLable',
    method: 'post',
    data: params
  })
}

export function createForecastMain(params) {
  return request({
    url: '/bf/goods/createForecastMain',
    method: 'post',
    data: params
  })
}

export function forecastMainList(params) {
  return request({
    url: '/bf/goods/forecastMainList',
    method: 'get',
    params: params
  })
}

export function deleteForecastMain(params) {
  return request({
    url: '/bf/goods/deleteForecastMain',
    method: 'post',
    data: params
  })
}

export function updateForecastMain(params) {
  return request({
    url: '/bf/goods/updateForecastMain',
    method: 'post',
    data: params
  })
}

export function insertGoodsResource(params) {
  return request({
    url: '/bf/goods/insertResource',
    method: 'post',
    data: params
  })
}

export function deleteGoodsResource(params) {
  return request({
    url: '/bf/goods/deleteResource',
    method: 'post',
    data: params
  })
}
