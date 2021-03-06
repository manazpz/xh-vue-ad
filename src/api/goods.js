import request from '@/utils/request'

export function goodsList(query) {
  return request({
    url: '/goods/list',
    method: 'get',
    params: query
  })
}

export function goodsDelete(params) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data: params
  })
}

export function updateGoods(params) {
  return request({
    url: '/goods/update',
    method: 'post',
    data: params
  })
}

export function getClassify(query) {
  return request({
    url: '/goods/classifyList',
    method: 'get',
    params: query
  })
}

export function getClassifyTree(query) {
  return request({
    url: '/goods/classifyTreeList',
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

export function updateClassify(params) {
  params.history = ''
  return request({
    url: '/goods/updateClassify',
    method: 'POST',
    data: params
  })
}

export function brandList(query) {
  return request({
    url: '/goods/brandList',
    method: 'get',
    params: query
  })
}

export function getBrandTree(query) {
  return request({
    url: '/goods/getBrandTree',
    method: 'get',
    params: query
  })
}

export function createBrand(params) {
  return request({
    url: '/goods/insertBrand',
    method: 'POST',
    data: params
  })
}

export function createBrandClass(params) {
  return request({
    url: '/goods/insertBrandClass',
    method: 'POST',
    data: params
  })
}

export function brandClassList(query) {
  return request({
    url: '/goods/brandClassList',
    method: 'get',
    params: query
  })
}

export function deleteBrandClass(params) {
  return request({
    url: '/goods/deleteBrandClass',
    method: 'POST',
    data: params
  })
}

export function updateBrand(params) {
  return request({
    url: '/goods/updateBrand',
    method: 'POST',
    data: params
  })
}

export function deleteBrand(params) {
  return request({
    url: '/goods/deleteBrand',
    method: 'POST',
    data: params
  })
}

export function updateBrandClass(params) {
  return request({
    url: '/goods/updateBrandClass',
    method: 'POST',
    data: params
  })
}

export function specList(query) {
  return request({
    url: '/goods/specList',
    method: 'get',
    params: query
  })
}

export function createSpec(params) {
  return request({
    url: '/goods/insertSpec',
    method: 'POST',
    data: params
  })
}

export function updateSpec(params) {
  return request({
    url: '/goods/updateSpec',
    method: 'POST',
    data: params
  })
}

export function deleteSpec(params) {
  return request({
    url: '/goods/deleteSpec',
    method: 'POST',
    data: params
  })
}

export function createSpecValue(params) {
  return request({
    url: '/goods/insertSpecValue',
    method: 'POST',
    data: params
  })
}

export function specValueList(query) {
  return request({
    url: '/goods/specValueList',
    method: 'get',
    params: query
  })
}

export function updateSpecValue(params) {
  return request({
    url: '/goods/updateSpecValue',
    method: 'POST',
    data: params
  })
}

export function updateClassifyBrand(params) {
  return request({
    url: '/goods/updateClassifyBrand',
    method: 'POST',
    data: params
  })
}

export function deleteClassify(params) {
  return request({
    url: '/goods/deleteClassify',
    method: 'POST',
    data: params
  })
}
