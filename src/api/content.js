import request from '../utils/request'


export function test (data) {
  return request({
    url: '/api/test',
    data
  })
}

export function contentList (data) {
  return request({
    url: '/api/content/list',
    data
  })
}

