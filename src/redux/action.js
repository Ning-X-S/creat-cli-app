/**
 * Action 类型
 */
// 这里我们是把方法名抽离出来方便后期代码的管理
export const type = {
  SWITCH_TITLE: 'SWITCH_TITLE'
}

/**
 * 切换菜单类型
 * @param {*} tempTitle 菜单名称
 * type 为调用哪一个方法
 */
export function switchTitle(tempTitle) {
  return {
    type: type.SWITCH_TITLE,
    tempTitle
  }
}