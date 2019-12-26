import {IInfoState} from '../../components/Info/index.interface'
/**
 * 文章列表item类型
 */
export interface IArticleItem {
  create_time: string,
  title: string,
  _id: string,
  desc: string,
  img_url: string,
  meta: {
    comments: Number,
    likes: Number,
    views: Number
  },
}
/**
 * 请求首页文章列表类型
 */
export interface IListReqParams {
  category_id: string,
  keyword: string,
  likes: string,
  tag_id: string,
  pageNum: Number,
  pageSize: Number,
  state: Number,
}
/**
 * 首页state类型
 */
export interface IHomeState extends IListReqParams {
  list: Array<IArticleItem>,
  total: Number,
  scrollLoading:Boolean,
  loading: Boolean,
  hasMore: Boolean
}
/**
 * 首页props类型
 */
export interface IHomeProps {
  getHomeList: Function,
  setHomeListState: Function,
  home: IHomeState,
  info:IInfoState
}