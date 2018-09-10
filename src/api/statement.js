import request from '@/utils/request'

export function insertStatement(params) {
  return request({
    url: '/statement/insert',
    method: 'POST',
    data: params
  })
}

export function updateStatement(params) {
  return request({
    url: '/statement/update',
    method: 'POST',
    data: params
  })
}

export function queryStatements(query) {
  return request({
    url: '/statement/list',
    method: 'get',
    params: query
  })
}

export function deleteStatements(params) {
  return request({
    url: '/statement/delete',
    method: 'post',
    data: params
  })
}
