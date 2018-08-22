
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
