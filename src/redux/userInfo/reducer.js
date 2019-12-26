import *  as Types from '../types'
import store from 'store';
const initialState = {
  userInfo: {
    github_id: "",
    name: "",
    type: 0,
    phone: "",
    img_url: "",
    email: "",
    introduce: "",
    avatar: "",
    location: "",
    password: "",
    _id: "",
    create_time: "",
    update_time: "",
  },
  registerInfo: {
    registerVisible: false,
    email: '',
    name: '',
    password: '',
    phone: '',
    introduce: '',
    type: 1,
  }
}

export default (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case Types.USER_INFO_LOGIN:
      newState = JSON.parse(JSON.stringify(state));
      store.set('userInfo', action.data)
      return {
        ...newState,
        userInfo: action.data,
      }
    case Types.USER_INFO_REGISTER://注册成功，也是登录成功
      newState = JSON.parse(JSON.stringify(initialState));
      store.set('userInfo', action.data)
      return {
        ...newState,
        userInfo: action.data,
      }
    case Types.USER_INFO_LOGOUT://用户退出登录
      newState = JSON.parse(JSON.stringify(state));
      store.remove('userInfo')
      return initialState

    case Types.USER_INFO_STATE://登录界面状态
      newState = JSON.parse(JSON.stringify(state));
      const { userInfo } = newState
      return {
        ...newState,
        userInfo: {
          ...userInfo,
          ...action.data
        }
      }
    case Types.USER_INFO_REGISTER_STATE://注册界面状态
      newState = JSON.parse(JSON.stringify(state));
      const { registerInfo } = newState
      return {
        ...newState,
        registerInfo: {
          ...registerInfo,
          ...action.data
        }
      }
    default:
      return state
  }
}