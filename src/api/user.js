import request from '../utils/request'

// 用户信息
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

// 个人页双列Feed流
export function personalFeed (data) {
  return request({
    url: '/personal/feed',
    data
  })
}

// 关注取消关注
export function changeFollow (data) {
  return request({
    url: '/account_relation/handle_follow',
    data,
    method: 'POST'
  })
}

// 用户动态列表
export function dynamicList (data) {
  return request({
    url: '/dynamic/list',
    data
  })
}

// 用户基本信息
export function accountBriefToken (data) {
  return request({
    url: '/account/get_brief_by_token',
    data
  })
}

// 申请加好友
export function applyFriend (data) {
  return request({
    url: '/account_relation/apply_friend',
    data,
    method: 'POST'
  })
}

// 同意加好友
export function updateApplyStatus (data) {
  return request({
    url: '/account_relation/update_apply_status',
    data,
    method: 'POST'
  })
}

// 删除好友
export function deleteFriend (data) {
  return request({
    url: '/account_relation/delete_friend',
    data,
    method: 'POST'
  })
}

// 获取会员入驻信息
export function getEnterInfo (data) {
  return request({
    url: '/account/get_enter_info',
    data
  })
}

// 追加用户标签
export function appendRelation (data) {
  return request({
    url: '/xz_interest_tag/append_relation',
    data,
    method: 'POST'
  })
}

// 删除用户标签
export function deleteRelation (data) {
  return request({
    url: '/xz_interest_tag/delete_relation',
    data,
    method: 'POST'
  })
}

// 编辑个人信息
export function saveAccountInfo (data) {
  return request({
    url: '/account/save_account_info',
    data,
    method: 'POST'
  })
}

// 交易记录
export function getMemberCenter (data) {
  return request({
    url: '/member/center',
    data
  })
}

// 交易记录
export function getRecordList (data) {
  return request({
    url: '/member/get_recharge_record',
    data
  })
}

// 邀请列表
export function getInviteList (data) {
  return request({
    url: '/invite/list',
    data
  })
}

// 邀请操作
export function inviteCreate (data) {
  return request({
    url: '/invite/create',
    method: 'POST',
    data
  })
}

// 新用户列表
export function getNewUserList (data) {
  return request({
    url: '/account/get_login_type_info',
    data
  })
}
