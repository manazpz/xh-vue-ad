import request from '@/utils/request'

export function backupDatabase(params) {
  return request({
    url: '/dataBase/backups',
    method: 'post',
    data: params
  })
}

export function backupDatabaseList(query) {
  return request({
    url: '/dataBase/backups/list',
    method: 'get',
    params: query
  })
}

export function recoveryDatabase(params) {
  return request({
    url: '/dataBase/recovery',
    method: 'post',
    data: params
  })
}
