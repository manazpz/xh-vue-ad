// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function payStatus(status) {
  if (status.payStatus !== '02') {
    switch (status.payStatus) {
      case '01' :
        return '未付款'
      case '03' :
        return '已取消'
    }
  } else {
    switch (status.deliveryStatus) {
      case '01' :
        return '已发货'
      case '02' :
        return '未发货'
      case '03' :
        return '交易完成'
    }
  }
}

export function orderType(status) {
  switch (status.payStatus) {
    case '01' :
      return '购买新机'
    case '02' :
      return '出售旧机'
    case '03' :
      return '换机订单'
  }
}

export function orderStatus(status) {
  switch (status) {
    case '01' :
      return '已完成'
    case '02' :
      return '已取消'
    case '03' :
      return '进行中'
    case '04' :
      return '售后中'
  }
}

export function sxStatus(status) {
  switch (status) {
    case '01' :
      return '上架'
    case '02' :
      return '下架'
  }
}

export function jcStatus(status) {
  switch (status) {
    case '01' :
      return '未检测'
    case '02' :
      return '已检测'
  }
}

export function invoiceType(type) {
  switch (type) {
    case '01' :
      return '个人'
    case '02' :
      return '公司'
  }
}
