import request from '@/utils/request'

export function refreshToken(refreshToken) {
  return request({
    url: '/sys/refreshToken',
    method: 'post',
    data: { refreshToken }
  })
}

export function getConfig(query) {
  return request({
    url: '/config/list',
    method: 'get',
    params: query
  })
}

export function userList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function insertUser(params) {
  return request({
    url: '/user/insert',
    method: 'POST',
    data: params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'POST',
    data: params
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/delete',
    method: 'POST',
    data: params
  })
}

export function updatePwd(data) {
  return request({
    url: '/password/update',
    method: 'post',
    data: data
  })
}

export function permissionList(query) {
  return request({
    url: '/user/permissions',
    method: 'get',
    params: query
  })
}

export function insertPermission(params) {
  params.isEnable = params.isEnable ? 'Y' : 'N'
  return request({
    url: '/user/permission/insert',
    method: 'POST',
    data: params
  })
}

export function updatePermission(params) {
  params.isEnable = params.isEnable ? 'Y' : 'N'
  return request({
    url: '/user/permission/update',
    method: 'POST',
    data: params
  })
}

export function userPermission(query) {
  if (!query) return null
  return request({
    url: '/user/userPermissions/' + query,
    method: 'get'
  })
}

export function allotUserPermission(params) {
  return request({
    url: '/user/permission/userAllot',
    method: 'POST',
    data: params
  })
}

export function changePwd(params, flag) {
  if (flag) {
    return request({
      url: '/sys/changePwd',
      method: 'POST',
      data: params
    })
  } else {
    return request({
      url: '/sys/resetPwd',
      method: 'POST',
      data: params
    })
  }
}

export function switchs(query) {
  if (!query) return null
  return request({
    url: '/sys/switchs',
    method: 'get',
    params: query
  })
}

export function updateSwitch(params) {
  return request({
    url: '/sys/switch',
    method: 'POST',
    data: params
  })
}

export function deleteFile(params) {
  return request({
    url: '/resources/deleteFile',
    method: 'post',
    data: params
  })
}

export function recoveryList(query) {
  return request({
    url: '/user/recoveryList',
    method: 'get',
    params: query
  })
}

export function createRecovery(params) {
  return request({
    url: '/user/createRecovery',
    method: 'post',
    data: params
  })
}

export function updateRecovery(params) {
  return request({
    url: '/user/updateRecovery',
    method: 'post',
    data: params
  })
}

export function customerList(query) {
  return request({
    url: '/user/customerList',
    method: 'get',
    params: query
  })
}

export function customerAllList(query) {
  return request({
    url: '/user/customerAllList',
    method: 'get',
    params: query
  })
}

export function updateCustomer(params) {
  return request({
    url: '/user/updateCustomer',
    method: 'post',
    data: params
  })
}

export function suggestionList(query) {
  return request({
    url: '/user/querySuggestion',
    method: 'get',
    params: query
  })
}

export function insertRole(params) {
  return request({
    url: '/user/insertRole',
    method: 'post',
    data: params
  })
}

export function updateRole(params) {
  return request({
    url: '/user/updateRole',
    method: 'post',
    data: params
  })
}

export function roleList(query) {
  return request({
    url: '/user/roles',
    method: 'get',
    params: query
  })
}

export function userRoleList(query) {
  return request({
    url: '/user/userRoles',
    method: 'get',
    params: query
  })
}

export function rolePermission(query) {
  if (!query) return null
  return request({
    url: '/user/rolePermission/' + query,
    method: 'get'
  })
}

export function allotRolePermission(params) {
  return request({
    url: '/user/permission/roleAllot',
    method: 'POST',
    data: params
  })
}

export function allotUserRole(params) {
  return request({
    url: '/user/role/allot',
    method: 'POST',
    data: params
  })
}
