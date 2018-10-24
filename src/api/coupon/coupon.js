import request from '@/utils/request'

export function couponList(params) {
  return request({
    url: '/bf/coupon/list',
    method: 'get',
    params: params
  })
}

export function insertCoupon(params) {
  return request({
    url: '/bf/coupon/insert',
    method: 'post',
    data: params
  })
}

export function updateCoupon(params) {
  return request({
    url: '/bf/coupon/update',
    method: 'post',
    data: params
  })
}

export function deleteCoupon(params) {
  return request({
    url: '/bf/coupon/delete',
    method: 'post',
    data: params
  })
}

