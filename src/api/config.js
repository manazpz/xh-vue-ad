import request from '@/utils/request'

export function configList(query) {
  return request({
    url: '/config/list',
    method: 'get',
    params: query
  })
}

export function configInsert(params) {
  return request({
    url: '/config/insertConfig',
    method: 'post',
    data: params
  })
}

export function configUpdate(params) {
  return request({
    url: '/config/updateConfig',
    method: 'post',
    data: params
  })
}

export function configDelete(params) {
  return request({
    url: '/config/deleteConfig',
    method: 'post',
    data: params
  })
}

export function tppConfigList(query) {
  return request({
    url: '/config/tppList',
    method: 'get',
    params: query
  })
}

export function tppConfigInsert(params) {
  return request({
    url: '/config/insertTpp',
    method: 'post',
    data: params
  })
}

export function tppConfigUpdate(params) {
  return request({
    url: '/config/updateTpp',
    method: 'post',
    data: params
  })
}

export function tppConfigDelete(params) {
  return request({
    url: '/config/deleteTpp',
    method: 'post',
    data: params
  })
}

export function homeLabelInsert(params) {
  return request({
    url: '/config/insertHomeLabel',
    method: 'post',
    data: params
  })
}

export function homeLabelList(query) {
  return request({
    url: '/config/homeLabels',
    method: 'get',
    params: query
  })
}

export function homeLabelUpdate(params) {
  return request({
    url: '/config/updateHomeLabel',
    method: 'post',
    data: params
  })
}

export function homeLabelDelete(params) {
  return request({
    url: '/config/deleteHomeLabel',
    method: 'post',
    data: params
  })
}

