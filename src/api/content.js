import request from '../utils/request'


export function test (data) {
  return request({
    url: '/api/test',
    data
  })
}

export function getList (data) {
  return request({
    url: '/api/content/list',
    data
  })
}

export function getDetail (data) {
  return request({
    url: '/api/content/detail',
    data
  })
}

export function createContent (data) {
  return request({
    url: '/api/content/create',
    method: 'post',
    data
  })
}

export function updateContent (data) {
  return request({
    url: '/api/content/update',
    method: 'post',
    data
  })
}

export function deleteContent (data) {
  return request({
    url: '/api/content/delete',
    method: 'post',
    data
  })
}

