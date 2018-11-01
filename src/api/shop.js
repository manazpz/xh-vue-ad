import request from '@/utils/request'
import { dataToFormData1 } from '@/utils/common'

export function shopInsert(params) {
  var formData = new FormData()
  dataToFormData1(formData, params)
  if (params.paperImgs) {
    for (var i = 0; i < params.paperImgs.length; i++) {
      formData.append('paperImgs', params.paperImgs[i].raw)
    }
    formData.append('paperPath', 'paper')
  } else {
    formData.append('paperImgs', null)
  }
  if (params.shopImgs) {
    for (var j = 0; j < params.shopImgs.length; j++) {
      formData.append('shopImgs', params.shopImgs[j].raw)
    }
    formData.append('shopPath', 'shop')
  } else {
    formData.append('shopImgs', null)
  }
  if (params.userSps) {
    for (var k = 0; k < params.userSps.length; k++) {
      formData.append('userSps', params.userSps[k].raw)
    }
    formData.append('userPath', 'user')
  } else {
    formData.append('userSps', null)
  }
  return request({
    url: '/shop/insert',
    method: 'post',
    data: formData
  })
}

export function shopList(query) {
  return request({
    url: '/shop/list',
    method: 'get',
    params: query
  })
}

export function shopDetail(query) {
  return request({
    url: '/shop/detail',
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
  var formData = new FormData()
  dataToFormData1(formData, params)
  if (params.paperImgs) {
    for (var i = 0; i < params.paperImgs.length; i++) {
      formData.append('paperFiles', params.paperImgs[i].raw)
    }
    formData.append('paperPath', 'paper')
  } else {
    formData.append('paperFiles', null)
  }
  if (params.shopImgs) {
    for (var j = 0; j < params.shopImgs.length; j++) {
      formData.append('shopFiles', params.shopImgs[j].raw)
    }
    formData.append('shopPath', 'shop')
  } else {
    formData.append('shopFiles', null)
  }
  if (params.userSps) {
    for (var k = 0; k < params.userSps.length; k++) {
      formData.append('spFiles', params.userSps[k].raw)
    }
    formData.append('userPath', 'user')
  } else {
    formData.append('spFiles', null)
  }
  return request({
    url: '/shop/update',
    method: 'post',
    data: formData
  })
}

export function settlementUpdate(params) {
  return request({
    url: '/shop/settlementUpdate',
    method: 'post',
    data: params
  })
}

export function settlementList(query) {
  return request({
    url: '/shop/settlementList',
    method: 'get',
    params: query
  })
}
