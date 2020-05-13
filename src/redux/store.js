import { createStore } from 'redux'
import reducer from './reducer'

const initialState = {
  tempTitle: '首页'
}

const store = createStore(reducer, initialState)

export default store
