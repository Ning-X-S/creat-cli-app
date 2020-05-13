/**
 * Reducer 数据处理
 */
// 导入action
import { type } from './action'

/**
 * @param state 为状态管理存储的数据，第一个是默认数据redux会传的不需要管
 * @parm action 为传进来的数据
 * 通过action.type来判断调用的是那个方法
 * */
export default (state, action) => {
  switch (action.type) {
    case type.SWITCH_TITLE:
      return {
        ...state,/// es6解构保留原数据
        tempTitle: action.tempTitle
      };
    default:
      return { ...state };
  }
}