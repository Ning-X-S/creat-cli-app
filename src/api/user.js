import request from '../utils/request'

export function userInfo (data) {
  return request({
    url: '/v1/account/homepage',
    data
  })
}

export function getShareInfo (data) {
  return request({
    url: '/share/wx/sign',
    data
  })
}
