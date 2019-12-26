import *  as Types from '../types'
import * as api from '../../common/api';
import { IListReqParams, IHomeState } from '../../pages/Home/index.interface'
const getHomeList = (params: IListReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqArticleList(params)
    const { data } = response
    console.log("data",data);
    if (data.code === 0) {
      dispatch({//获取到文章列表
        type: Types.HOME_ARTICLE_LIST,
        data: {
          ...data.data,
          loading: false,
          scrollLoading:false
        }
      })
    } else {
      dispatch({
        type: Types.HOME_ARTICLE_ERROR,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}
/**
 * 修改文章列表状态
 * @param state 状态
 */
const setHomeListState = (state: IHomeState) => {
  return (dispatch: any) => {
    dispatch({//修改文章列表状态
      type: Types.HOME_ARTICLE_LIST_STATE,
      data: state
    })
  }
}

export {
  getHomeList,
  setHomeListState
}