import axios from 'axios'
// import qs from 'qs'
import { open } from '@/scheme'
import sha from './sha'

axios.interceptors.response.use((res) => {
  let { status, data: { code = 0, error_code: errorCode = 0, message = '' } } = res
  if (status === 401) {
    open.xz_open_login({
      success: () => {
        window.location.reload()
      }
    })
    return Promise.reject(res.data)
  } else {
    if (Number(code) === 0 && Number(errorCode) === 0) {
      return Promise.resolve(res.data)
    } else if (Number(code) === 40001) {
      open.xz_open_login({
        success: () => {
          window.location.reload()
        }
      })
      return Promise.reject(res.data)
    } else if (Number(errorCode) === 4133202 || Number(errorCode) === 4133203 || Number(errorCode) === 4040007) {
      if (window.location.href.indexOf('/user/application1') !== -1) {
        // 会员入驻也在第一次登录后进入，IOS客户端写入token存在写不进来的可能，暂时先这样写
        console.log('access_token兼容')
      } else {
        open.xz_open_login({
          success: () => {
            window.location.reload()
          }
        })
      }
      return Promise.reject(res.data)
    } else if (Number(errorCode) === 4161107) {
      open.xz_open_login({
        message: message
      })
      return Promise.reject(res.data)
    } else if (Number(errorCode) === 4161220 || Number(errorCode) === 4161222) {
      open.xz_response_error_code({
        error_code: Number(errorCode),
        message: message
      })
      let data = {
        message: ''
      }
      return Promise.reject(data)
    } else if (Number(errorCode) === 4133205) {
      open.xz_response_error_code({
        error_code: Number(errorCode),
        message: message,
        pop_image: res.data.data.pop_image
      })
      let data = {
        message: ''
      }
      return Promise.reject(data)
    } else {
      return Promise.reject(res.data)
    }
  }
}, function (err) {
  if (process.env.NODE_ENV === 'production') {
    err.message = '网络异常，请重新加载'
  }
  return Promise.reject(err)
})

export default function request (option) {
  // console.log(process.env)
  const method = typeof option.method === 'string' ? option.method.toUpperCase() : 'GET'
  let data = option.params || option.data || {}
  // 测试签名的token，inf环境上的
  // data.access_token = '18d4d9d3de366dc7e561d0ebf25aaf7b'

  // 自己的token
  // data.access_token = 'a1d1db91f0c58f7a23743788b2fde05f'

  // 他人的token
  // data.access_token = 'cbac5c4cdc27e320ae612f91450a9050'

  data.app = 'xz'
  data.via = data.via ? data.via : 'h5'
  data.s_secretKey = 'tBXg2CqRI2h3kR8r0krtS6vqlTBLpynn'
  data.s_st = new Date().getTime()
  let time = '' + data.s_st
  let arr = []
  let k
  for (k in data) {
    arr.push(k)
  }
  arr.sort()
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    if (!!data[arr[i]] && data[arr[i]] !== 'undefined') {
      arr2.push(arr[i])
      arr2.push(data[arr[i]])
    } else {
      delete data[arr[i]]
    }
  }

  let str = arr2.join('')

  let sha1 = sha.hex_sha1(str)

  let start = Number(time.slice(time.length - 2, time.length - 1)) + Number(time.slice(time.length - 1, time.length))
  if (start >= 10) {
    start -= 10
  }
  data.s_sign = sha1.slice(start, start + 20)

  delete data.s_secretKey

  let options = {
    headers: option.headers || {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // 'Content-Type': (method !== 'GET') ? 'application/x-www-form-urlencoded' : 'application/json'
    },
    url: data.url || '/',
    baseURL: data.baseURL || process.env.VUE_APP_BASE_URL,
    timeout: 15000,
    method: method,
    params: data,
    // data: method !== 'GET' ? qs.stringify(data || {}) : {},
    withCredentials: true, // Cookies
    ...option
  }
  return axios(options)
}
