import *  as Types from '../types'
const initialState = {
  tagList: [],
  linkList: [],
  categoryList:[],
  tag_id:'',
  category_id:''
}

export default (state = initialState, action) => {
  let newState = {}
  switch (action.type) {
    case Types.INFO_TAG_LIST:
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        tagList: action.data.list
      }
      case Types.INFO_CATEGORY_LIST:
        newState = JSON.parse(JSON.stringify(state));
        return {
          ...newState,
          categoryList: action.data.list
        }
    case Types.INFO_FRIENDLINK_LIST:
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        linkList: action.data.list
      }
    case Types.INFO_RIGHT_STATE://修改博主相关信息
      newState = JSON.parse(JSON.stringify(state));
      return {
        ...newState,
        ...action.data
      }
    default:
      return state
  }
}
