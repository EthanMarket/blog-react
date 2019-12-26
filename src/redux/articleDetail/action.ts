import *  as Types from '../types'
import * as api from '../../common/api';
import { IReqParams, IDetailState } from '../../pages/ArticleDetail/index.interface'
import markdown from '../../common/markdown'
const getArticleDetail = (params: IReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqArticleDetail(params)
    const { data } = response
    if (data.code === 0) {
      const marded = await markdown.marked(data.data.content)
      dispatch({//获取到文章详情
        type: Types.DETAIL_ARTICLE_MAIN,
        data: {
          ...data.data,
          ...marded,
          loading: false,
        }
      })
    } else {
      dispatch({
        type: Types.DETAIL_RESPONSE_ERROR,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}
const postAddCommonet = (params: IReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqAddComment(params)
    const { data } = response
    if (data.code === 0) {
      const marded = await markdown.marked(data.data.content)
      dispatch({//添加评论
        type: Types.DETAIL_ARTICLE_ADD_COMMENT,
        data: {
          ...data.data,
          ...marded,
          loading: false,
        }
      })
    } else {
      dispatch({
        type: Types.USER_INFO_LOGOUT,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}
const postAddSecondComment = (params: IReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqAddSecondComment(params)
    const { data } = response
    if (data.code === 0) {
      const marded = await markdown.marked(data.data.content)
      dispatch({//添加评论
        type: Types.DETAIL_ARTICLE_ADD_COMMENT,
        ...marded,
        data: {
          ...data.data,
          loading: false,
        }
      })
    } else {
      dispatch({
        type: Types.USER_INFO_LOGOUT,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}
const postLikeArticle = (params: IReqParams) => {
  return async (dispatch: any) => {
    const response = await api.reqLikeArticle(params)
    const { data } = response
    if (data.code === 0) {
      dispatch({//添加喜欢文章
        type: Types.DETAIL_ARTICLE_LIKE,
        data: {
          ...data.data,
          loading: false,
        }
      })
    } else {
      dispatch({
        type: Types.USER_INFO_LOGOUT,
        data: {
          ...data.data,
          loading: false
        }
      })
    }
  }
}
/**
 * 修改文章详情状态
 * @param state 状态
 */
const setDetaileState = (state: IDetailState) => {
  return (dispatch: any) => {
    dispatch({//修改文章列表状态
      type: Types.DETAIL_ARTICLE_STATE,
      data: state
    })
  }
}

export {
  getArticleDetail,
  postLikeArticle,
  setDetaileState,
  postAddCommonet,
  postAddSecondComment
}