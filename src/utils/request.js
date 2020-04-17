import axios from 'axios'
// import qs from 'qs'
import sha from './sha'

axios.interceptors.response.use((res) => {
  let { status, data: { code = 0, error_code: errorCode = 0, message = '' } } = res
  console.log(message)
  if (status === 401) {
    return Promise.reject(res.data)
  } else {
    if (Number(code) === 0 && Number(errorCode) === 0) {
      return Promise.resolve(res.data)
    } else if (Number(code) === 40001) {
      return Promise.reject(res.data)
    } else if (Number(errorCode) === 4133202 || Number(errorCode) === 4133203 || Number(errorCode) === 4040007) {
      return Promise.reject(res.data)
    } else if (Number(errorCode) === 4161107) {
      return Promise.reject(res.data)
    } else if (Number(errorCode) === 4161220 || Number(errorCode) === 4161222) {
      let data = {
        message: ''
      }
      return Promise.reject(data)
    } else if (Number(errorCode) === 4133205) {
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
  const method = typeof option.method === 'string' ? option.method.toUpperCase() : 'GET'
  let data = option.params || option.data || {}


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
