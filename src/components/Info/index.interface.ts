/**
 * 请求Tag、分类、友情链接，参数类型
 */
export interface IInfoReqParams {
  pageNum: Number,
  pageSize: Number,
}
/**
 * 博主相关信息state类型
 */
export interface IInfoState {
  tagList: [],
  linkList: [],
  categoryList:[],
  tag_id: string,
  category_id:string
}
/**
 * 博主相关props类型
 */
export interface IInfoProps {
  getTagList: Function,
  getFriendLinkList: Function,
  getCategoryList: Function,
  setInfoState: Function,
  info: IInfoState,
}