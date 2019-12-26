import *  as Types from '../types'


const initialState = {
  list: [],
  total: 0,
  category_id: "",
  keyword: "",
  likes: "",
  pageNum: 0,
  pageSize: 10,
  state: 1,
  tag_id: "",
  loading: true,
  hasMore: true,
  scrollLoading: false
}

export default (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case Types.HOME_ARTICLE_LIST://获取首页列表
      newState = JSON.parse(JSON.stringify(state)); //简单的深拷贝
      const { pageNum, list } = newState
      console.log(newState);
      const hasMore = action.data.list.length === 10 ? true : false
      if (pageNum) {//如果不是第一页，那就应该添加到数组中
        const newList = list.concat(action.data.list)
        return {
          ...newState,
          ...action.data,
          loading: false,
          scrollLoading: false,
          list: newList,
          hasMore
        }
      }
      return { ...newState, ...action.data, loading: false ,hasMore}
    case Types.HOME_ARTICLE_LIST_STATE://修改首页文章列表状态
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        ...action.data
      }
    default:
      return state
  }
}
