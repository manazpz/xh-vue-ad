import request from '@/utils/request'
import { dataToFormData } from '@/utils/common'

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
