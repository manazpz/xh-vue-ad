import request from '@/utils/request'

export function getComment(params) {
  return request({
    url: '/bf/news/list',
    method: 'get',
    params: params
  })
}

export function setComment(params) {
  return request({
    url: '/bf/news/insert',
    method: 'post',
    data: params
  })
}
