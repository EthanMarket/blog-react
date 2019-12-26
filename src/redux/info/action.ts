import *  as Types from '../types'
import * as api from '../../common/api';
import { IInfoReqParams, IInfoState } from '../../components/Info/index.interface'
const defaltParams = {
  pageNum: 1,
  pageSize: 10,
}
const getCategoryList = (params: IInfoReqParams = defaltParams) => {
  return async (dispatch: any) => {
    const response = await api.reqCategoryList(params)
    const { data } = response
    if (data.code === 0) {
      dispatch({//获取到分类
        type: Types.INFO_CATEGORY_LIST,
        data: data.data
      })
    } else {
      dispatch({
        type: Types.INFO_RESPONSE_ERROR,
        data: data.data
      })
    }
  }
}
const getTagList = (params: IInfoReqParams = defaltParams) => {
  return async (dispatch: any) => {
    const response = await api.reqTagList(params)
    const { data } = response
    if (data.code === 0) {
      dispatch({//获取到tag列表
        type: Types.INFO_TAG_LIST,
        data: data.data
      })
    } else {
      dispatch({
        type: Types.INFO_RESPONSE_ERROR,
        data: data.data
      })
    }
  }
}
const getFriendLinkList = (params: IInfoReqParams = defaltParams) => {
  return async (dispatch: any) => {
    const response = await api.reqFriendLinkList(params)
    const { data } = response
    if (data.code === 0) {
      dispatch({//获取到友情链接
        type: Types.INFO_FRIENDLINK_LIST,
        data: data.data
      })
    } else {
      dispatch({
        type: Types.INFO_RESPONSE_ERROR,
        data
      })
    }
  }
}
/**
 * 修改文章列表状态
 * @param state 状态
 */
const setInfoState = (state: IInfoState) => {
  return (dispatch: any) => {
    dispatch({//修改文章列表状态
      type: Types.INFO_RIGHT_STATE,
      data: state
    })
  }
}

export {
  getTagList,
  getFriendLinkList,
  getCategoryList,
  setInfoState
}