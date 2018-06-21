import md5 from './md5'
const Tool = {}
/**
 * 格式化时间
 *
 * @param {any}
 * @returns
 */
Tool.formatDate1 = function (str) {
  let date = new Date(str)
  let time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if (time / 1000 < 60) {
    return '刚刚'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}

/**
 * 格式化时间2
 *
 * @param {any} t
 * @returns
 */
Tool.formatDate2 = function (currDate, str) {
  if (currDate === '' || currDate == null) {
    return
  }
  let nowDate = new Date(currDate)
  let year = nowDate.getFullYear() //  获取完整的年份(4位,1970-????)
  let month = nowDate.getMonth() + 1 //  获取当前月份(0-11,0代表1月)
  let day = nowDate.getDate() //  获取当前日(1-31)  v
  let hh = nowDate.getHours()
  let mm = nowDate.getMinutes()
  let ss = nowDate.getSeconds()
  if (str === 'china') {
    return (year + '年' + month + '月' + day + '日' + '  ' + hh + ':' + mm + ':' + ss)
  }
  if (month < 10) {
    month = '0' + month
  }

  if (day < 10) {
    day = '0' + day
  }

  if (hh < 10) {
    hh = '0' + hh
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  if (ss < 10) {
    ss = '0' + ss
  }
  return (year + str + month + str + day + '  ' + hh + ':' + mm + ':' + ss)
}

/**
 * 本地数据存储或读取
 *
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
  if (arguments.length === 1) {
    return window.localStorage.getItem(key)
  } else {
    return window.localStorage.setItem(key, value)
  }
}

/**
 * 删除本地数据
 *
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
  if (key) {
    return window.localStorage.removeItem(key)
  }
  return window.localStorage.removeItem()
}

Tool.setCookie = function (name, value) {
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

Tool.md5 = md5.hex_md5

Tool.isPoneAvailable = function (phone) {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(phone)) {
    return false
  } else {
    return true
  }
}
Tool.isEmail = function (email) {
  var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
  return reg.test(email)
}

Tool.getCookie = function (cname) {
  let name = cname + '='
  var ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return null
}
Tool.delCookie = function (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = Tool.getCookie(name)
  console.log(cval)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

Tool.getTarget = function (evt) {
  return evt.target || evt.srcElement
}

Tool.stopProp = function (event) {
  if (event.stopPropagation) {
    event.stopPropagation()
  } else {
    event.cancelBubble = true
  }
}

Tool.trim = function(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

Tool.isLogin = function () {
  if (Tool.getCookie('ngtoken')) {
    return true
  }
  return false
}

Tool.isContains = function(arr, item) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return true
    }
  }
  return false
}

export default Tool
