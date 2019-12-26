import *  as Types from '../types'
import { message } from 'antd';
const initialState = {
  isLoading: true,
  articleDetail: {
    _id: "",
    title: '',
    author: 'Ethan',
    create_time: '',
    numbers: '',
    content: '',//文章的详细内容
    toc: '',//右侧的快捷导航
    tags: [{
      _id: '',
      name: '',
    }],
    comments: [{
      user: { name: "", type: 0, avatar: "" },
      is_top: false,
      likes: 0,
      state: 1,
      is_handle: 2,
      _id: "",
      article_id: "",
      content: "",
      user_id: "",
      other_comments: [],
      create_time: "",
      update_time: "",
      id: 2,
      __v: 0,
    }],
    meta: {
      comments: 0,
      likes: 0,
      views: 0,
      currentUserLike: false//当前用户是否点赞
    }
  },
  articleState: {
    isSubmitLoading: false,
    commentContent: '',
    popContent: '',
    popVisible: false,
    comment_id: '',
    to_user: {},
  }
}

export default (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case Types.DETAIL_ARTICLE_MAIN://文章详情
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        isLoading: false,
        articleDetail: action.data
      }
    case Types.DETAIL_ARTICLE_LIKE://喜欢文章
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        isLoading: false,
        articleDetail: action.data
      }
    case Types.DETAIL_ARTICLE_STATE://修改博主相关信息
      newState = JSON.parse(JSON.stringify(state));
      const { articleState } = newState
      return {
        ...newState,
        articleState: {
          ...articleState,
          ...action.data
        }
      }
    case Types.DETAIL_ARTICLE_ADD_COMMENT://添加评论成功的时候
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        articleDetail: action.data,
        articleState: initialState.articleState,
      }
    case Types.DETAIL_RESPONSE_ERROR://添加评论成功的时候
      newState = JSON.parse(JSON.stringify(state));
      message.warning(action.data.message, 1);
      return {
        ...newState,
        articleState: initialState.articleState
      }
    default:
      return state
  }
}
