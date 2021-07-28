// export const baseUrl = 'https://api.ztbory.com/dev/qualification' // 测试环境
export const baseUrl = 'https://api.ztbory.com/v3/qualification' // 正式环境

// export const devUrl = 'https://api.ztbory.com/dev/qualification' //123 测试环境
export const devUrl ='https://api.ztbory.com/v3/qualification' // 生产环境

// 过滤数据
export function filterData(newData, oldData, seleModel, seachModel) {
  newData = oldData
  let cose = []
  return newData.filter(function (item) {
    if (item[seleModel] === undefined || item[seleModel] == null) {
      item[seleModel] = ''
    }
    if (item[seleModel].toString().indexOf(seachModel) !== -1) {
      cose.push(item)
      newData = cose
      return item
    } else {
      newData = cose
    }
  })
}

// 截取url后面的字符串
export function getQueryString(name) {
  var r = window.location.hash
  let len = r.length
  let findNotLen = r.indexOf('?')
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let se = r.substr(findNotLen + 1, len).match(reg)
  if (se != null) return unescape(se[2])
  return null
}
// 请求状态
export const ERR_OK = 0
// 请求状态
export const STATUS = 200
export const CREAD = 201

// 格式化时间
export function format(time, format) {
  if (!time) {
    return
  }
  let t = new Date(time)
  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

export function bd_encrypt(gg_lng, gg_lat) {
  let X_PI = Math.PI * 3000.0 / 180.0
  let x = gg_lng
  let y = gg_lat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  let bd_lng = z * Math.cos(theta) + 0.0074
  let bd_lat = z * Math.sin(theta) + 0.0127
  return {
    lati: bd_lat,
    langi: bd_lng
  }
}
export function old_encrypt(gg_lng, gg_lat) {
  let X_PI = Math.PI * 3000.0 / 180.0
  let x = gg_lng
  let y = gg_lat
  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  let bd_lng = z * Math.cos(theta) + 0.0124
  let bd_lat = z * Math.sin(theta) + 0.007
  return {
    lati: bd_lat,
    langi: bd_lng
  }
}
export function sortNum(num, len) {
  if (typeof num !== 'string') {
    num = num.toString()
  }
  let bef = num.substring(0, len)
  let last = num.substring(len)
  return parseInt(bef) + parseFloat(last / 60)
}
