import { IUserState } from '../../components/Login/index.interface'
export interface IReqParams {
  _id: string,
  user_id: string
}

export interface IDetailState {
  isLoading: boolean,
  articleDetail: {
    _id: string,
    title: string,
    author: string,
    create_time: string,
    numbers: string,
    content: string,//文章的详细内容
    toc: string,//右侧的快捷导航
    tags: [{
      _id: string,
      name: string,
    }],
    meta: {
      comments: string,
      likes: string,
      views: string,
      currentUserLike: boolean
    },
    comments: [
      {
        user: { name: string, type: 0, avatar: string },
        is_top: false,
        likes: 0,
        state: 1,
        is_handle: 2,
        _id: string,
        article_id: string,
        content: string,
        user_id: string,
        other_comments: [
          {
            _id: string,
            user: { name: string, type: 0, avatar: string },
            create_time: string,
            content: string,
            to_user: {
              name: string,
              type: number
            }
          }
        ],
        create_time: string,
        update_time: string,
        id: 2,
        __v: 0,
      }
    ]
  },
  articleState: {
    isSubmitLoading: false,
    commentContent: string,
    popContent: string,
    popVisible: boolean,
    comment_id: string,
    to_user: {},
  }
}
export interface ICommentProps {
  getArticleDetail: Function,//获取文章详情
  postLikeArticle: Function,//文章点赞
  setDetaileState: Function,//修改详情页state
  postAddCommonet: Function,//添加评论
  postAddSecondComment: Function,//添加二级三级评论
  articleDetail: IDetailState,
}
export interface IDetailProps extends ICommentProps {
  userInfo: IUserState,
  location: {
    pathname: string
  },
  match: {
    params: {
      _id: string,
      type: string
    }
  }
}