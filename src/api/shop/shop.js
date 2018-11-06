import request from '@/utils/request'
import { dataToFormData,dataToFormData1 } from '@/utils/common'

export function shopInfo(query) {
  return request({
    url: '/bf/shop/info',
    method: 'get',
    params: query
  })
}

export function updateShop(params, fileList) {
  var formData = new FormData()
  dataToFormData(formData, params)
  if (fileList.length > 0) {
    for (var i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i].raw)
    }
  } else {
    formData.append('files', null)
  }
  formData.append('path', 'shop')
  return request({
    url: '/bf/shop/update',
    method: 'POST',
    data: formData
  })
}

export function settlementList(query) {
  return request({
    url: '/bf/shop/settlementList',
    method: 'get',
    params: query
  })
}

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
    url: '/bf/shop/insert',
    method: 'post',
    data: formData
  })
}
