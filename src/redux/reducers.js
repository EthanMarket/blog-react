import { combineReducers } from 'redux'

import home from './home/reducer'
import info from './info/reducer'
import articleDetail from './articleDetail/reducer'
import userInfo from './userInfo/reducer'
export default combineReducers({
  home,
  info,
  articleDetail,
  userInfo
})
