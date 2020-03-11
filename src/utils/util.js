import { open } from '@/scheme'
import * as Sentry from '@sentry/browser'

export default {
  getCookie (cname) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
    }
    return ''
  },
  // 设置localStorage
  setStore: function (name, content) {
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  // 获取localStorage
  getStore: function (name) {
    return window.localStorage.getItem(name)
  },

  // 删除localStorage
  removeStore: function (name) {
    window.localStorage.removeItem(name)
  },
  // 上报sentry，指定错误
  reportSentry: function (info) {
    console.log(Sentry)
    Sentry.captureException(JSON.stringify(info))
  },
  /**
   * 字符串分割
   * @param {string} string 要转换的字符串
   * @param  {number} rule 规则
   * stringSegmentation('1234567890',3,3,4) // 123 456 7890
   */
  stringSegmentation (string, ...rule) {
    let arr = []
    rule.reduce((acc, cur) => {
      arr.push(acc)
      return acc + cur
    })
    arr.reverse().forEach(value => {
      if (string.length > value) {
        string = string.slice(0, value) + ' ' + string.slice(value)
      }
    })
    return string
  },
  // 格式化时间
  formatTime (time) {
    let second = time % 60 > 9 ? '' + time % 60 : '0' + time % 60
    const initMin = parseInt(time / 60)
    const initHour = parseInt(initMin / 60)
    let min = initMin % 60 > 9 ? '' + initMin % 60 : '0' + initMin % 60
    let hour = initHour > 9 ? '' + initHour % 60 : '0' + initHour % 60
    return `${hour}:${min}:${second}`
  },
  /**
   * 时间戳转日期
   * @param {number} timestamp 要转换的时间戳
   * @param  {string} type 默认年月日，accurate带时分秒
   * timestampFun('1564295562000') // 2019-07-28
   * timestampFun('1564295562000', 'accurate') // 2019-07-28 14:32:42
   */
  timestampFun (timestamp, type = 'default') {
    let now = new Date(timestamp)
    let year = now.getFullYear()
    let month = String(now.getMonth() + 1).padStart(2, '0')
    let date = String(now.getDate()).padStart(2, '0')
    let result = `${year}-${month}-${date}`

    if (type === 'accurate') {
      let hour = String(now.getHours()).padStart(2, '0')
      let minute = String(now.getMinutes()).padStart(2, '0')
      let second = String(now.getSeconds()).padStart(2, '0')
      result = `${result} ${hour}:${minute}:${second}`
    }
    return result
  },
  /**
   * 在当前页面跳转到某个页
   * @param {String} url 跳转路由的相对路径
   */
  redirectTo (url) {
    if (process.env.NODE_ENV === 'development') {
      window.location.href = `${url}`
    } else {
      window.location.href = `/xz${url}`
    }
  },
  /**
   * 保留当前页面，打开新标签页跳转到某个页
   * @param {String} url 跳转路由的相对/绝对路径
   */
  navigateTo (url, navigation_hidden = 0, back_button_hidden = 0) {
    // 判断是否为完整路由
    const isFullUrl = /^http/.test(url)

    if (open.isXZ) {
      open['xz_open_webview']({
        url: isFullUrl ? url : `${window.location.origin}/xz${url}`,
        navigation_hidden: navigation_hidden,
        back_button_hidden: back_button_hidden
      })
    } else {
      if (process.env.NODE_ENV === 'development') {
        window.location.href = `${url}`
      } else {
        window.location.href = isFullUrl ? url : `/xz${url}`
      }
    }
  },

  /**
   * 关闭当前页或跳转
   * @param {String} url 跳转路由的相对路径
   */
  closeWebOrRedirect (url) {
    if (open.isXZ) {
      open.xz_close_webview()
    } else {
      this.redirectTo(url)
    }
  },
  /**
   * 获取url后的参数 ie浏览器不兼容
   * @param {String} url 页面路径
   * urlParams('http://m.lehe.com/stockX/sell/confirm?goods_id=3&sku_id=4')
   */
  getURLParams (url) {
    const obj = {}
    url.replace(/([^?&=]+)=([^&]+)/g, (_, key, val) => {
      obj[key] = val
    })
    return obj
  },
  /**
   * 计算字符串的字节数
   * @param {String} str 字符串
   */
  sizeofByte (str, charset = 'utf-8') {
    let total = 0
    let charCode
    charset = charset.toLowerCase()
    if (charset === 'utf-8' || charset === 'utf8') {
      for (let i = 0, len = str.length; i < len; i++) {
        charCode = str.codePointAt(i)
        if (charCode <= 0x007f) {
          total += 1.2
        } else if (charCode <= 0x07ff) {
          total += 2
        } else if (charCode <= 0xffff) {
          total += 3
        } else {
          // 表情算2.5个
          total += 2.5
          i++
        }
      }
    } else if (charset === 'utf-16' || charset === 'utf16') {
      for (let i = 0, len = str.length; i < len; i++) {
        charCode = str.codePointAt(i)
        if (charCode <= 0xffff) {
          total += 2
        } else {
          total += 4
          i++
        }
      }
    } else {
      total = str.replace(/[^\x00-\xff]/g, 'aa').length
    }
    return total
  },
  timeParse (result) {
    const h = Math.floor((result / 3600) % 24)
    const m = Math.floor((result / 60) % 60)
    const s = Math.floor(result % 60)
    result = s < 10 ? '0' + s : s
    if (m > 0) {
      result = (m < 10 ? '0' + m : m) + ':' + result
    } else {
      result = '00' + ':' + result
    }
    if (h > 0) {
      result = (h < 10 ? '0' + h : h) + ':' + result
    }
    return result
  }
}
