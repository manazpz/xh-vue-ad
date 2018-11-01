
export function toThousands(num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
    return $1 + ','
  }).replace(/\.$/, '')
}

export function commafyback(num) {
  var x = num.split(',')
  return parseFloat(x.join(''))
}

export function keyToValue(data) {
  return data.reduce((acc, cur) => {
    acc[cur.keyWord] = cur.name
    return acc
  }, {})
}
export function dataToFormData(formdata, data) {
  for (var i in data) {
    if (Array.isArray(data[i])) {
      formdata.append(i, JSON.stringify(data[i]))
    } else {
      formdata.append(i, data[i])
    }
  }
  return formdata
}

export function dataToFormData1(formdata, data) {
  for (var i in data) {
    formdata.append(i, JSON.stringify(data[i]))
  }
  return formdata
}

