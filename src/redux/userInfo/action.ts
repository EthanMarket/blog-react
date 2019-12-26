import *  as Types from '../types'
import * as api from '../../common/api';
import { IReqParams, IUserState } from '../../components/Login/index.interface'

const postUserLogin = (params: IReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqLogin(params)
    const { data } = response
    console.log(response);
    if (data.code === 0) {
      dispatch({//用户登录
        type: Types.USER_INFO_LOGIN,
        data: {
          ...data.data,
          loading: false,
        }
      })
    } else {
      dispatch({
        type: Types.USER_RESPONSE_ERROR,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}

const postUserRegister = (params: IReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqRegister(params)
    const { data } = response
    console.log(response);
    if (data.code === 0) {
      dispatch({//用户注册成功，同时登录成功
        type: Types.USER_INFO_REGISTER,
        data: {
          ...data.data,
          loading: false,
        }
      })
    } else {
      dispatch({
        type: Types.USER_RESPONSE_ERROR,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}
/**
 * 用户退出登录
 */
const postUserLogout = (state: IReqParams) => {
  return (dispatch: any) => {
    dispatch({//用户退出登录
      type: Types.USER_INFO_LOGOUT,
      data: state
    })
  }
}
/**
 * 修改注册状态
 * @param state 状态
 */
const setRegisterState = (state: IUserState) => {
  return (dispatch: any) => {
    dispatch({//修改用户注册状态
      type: Types.USER_INFO_REGISTER_STATE,
      data: state
    })
  }
}
/**
 * 修改用户状态
 * @param state 状态
 */
const setUserState = (state: IUserState) => {
  return (dispatch: any) => {
    dispatch({//
      type: Types.USER_INFO_STATE,
      data: state
    })
  }
}
export {
  postUserLogin,
  setUserState,
  postUserRegister,
  setRegisterState,
  postUserLogout
}