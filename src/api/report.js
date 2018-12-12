import request from '@/utils/request'

export function customerReport(query) {
  if (query.time) {
    query.startTime = query.time[0]
    query.endTime = query.time[1]
  }
  return request({
    url: '/report/customer',
    method: 'get',
    params: query
  })
}

