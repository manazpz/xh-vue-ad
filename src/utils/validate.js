/**
 * Created by jiachenpan on 16/11/18.
 */

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('手机号不为空!'))
  }
  if (!Number.isInteger(+value)) {
    return callback(new Error('请输入数字值!'))
  } else {
    if (phoneReg.test(value)) {
      return callback()
    } else {
      return callback(new Error('手机号格式不正确'))
    }
  }
}

export const checkEmail = (rule, value, callback) => {
  const phoneReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('邮箱不为空!'))
  }
  if (phoneReg.test(value)) {
    return callback()
  } else {
    return callback(new Error('邮箱格式不正确'))
  }
}

export const checkIdCard = (rule, value, callback) => {
  const phoneReg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('身份证不为空!'))
  }
  if (phoneReg.test(value)) {
    return callback()
  } else {
    return callback(new Error('身份证不正确'))
  }
}

export const checkBankNo = (rule, value, callback) => {
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('银行账号不为空!'))
  }
  if (!Number.isInteger(+value)) {
    return callback(new Error('请输入数字值!'))
  } else {
    return callback()
  }
}

export const checkNo = (rule, value, callback) => {
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('数值不为空!'))
  }
  if (!Number.isInteger(+value)) {
    return callback(new Error('请输入数字值!'))
  } else {
    return callback()
  }
}

