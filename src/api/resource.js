import request from '@/utils/request'

export function queryResources(query) {
  return request({
    url: '/resource/list',
    method: 'get',
    params: query
  })
}

export function insertResources(params) {
  return request({
    url: '/resource/insert',
    method: 'POST',
    data: params
  })
}

export function updateResources(params) {
  return request({
    url: '/resource/update',
    method: 'POST',
    data: params
  })
}

export function deleteResources(params) {
  return request({
    url: '/resource/delete',
    method: 'POST',
    data: params
  })
}

