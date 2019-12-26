import * as React from 'react';
import './index.less'
import './marked.less'
import { timeToLocal, getQueryStringByName } from '../../common/utils'
import { Icon, Avatar, message, Button, Input } from 'antd';
import ItemLogo from '../../assets/img/userLogo.jpeg'
import Loading from '../../components/Loading'
import { connect } from 'react-redux';
import * as actions from '../../redux/articleDetail/action'
import Comment from './Comment'
import { IDetailProps } from './index.interface'
import { bindActionCreators } from 'redux';
const { TextArea } = Input;
class ArticleDetail extends React.Component<IDetailProps> {
  componentDidMount() {
    this.getArticleDetail()
  }
  /**
   * 请求文章详情
   */
  private getArticleDetail() {
    const _id = getQueryStringByName('_id')
    this.props.getArticleDetail({
      _id,
      type: 1
    })
  }

  private likeArticle = () => {
    const _id = getQueryStringByName('_id')
    const { userInfo } = this.props.userInfo
    if (userInfo._id) {
      this.props.postLikeArticle({
        _id,
        user_id: userInfo._id
      })
    } else {
      //弹出登录框
      message.warning('登录才能点赞，请先登录！', 1);
    }
  }

  private renderHeader() {
    const {
      author,
      create_time,
      numbers,
      meta,
      tags
    } = this.props.articleDetail.articleDetail
    return (
      <div className='detail-header'>
        <div className='detail-user'>
          <Avatar
            className="auth-logo"
            src={ItemLogo}
            size={50}
            icon="user"
          />
          <div className="header-user">
            <span className='header-name'>{author}</span>
            <div className="meta">
              <span className="publish-time">
                {create_time ? timeToLocal(create_time) : ''}
              </span>
              <span className="wordage">
                字数 {numbers}
              </span>
              <span className="views-count">
                阅读 {meta.views}
              </span>
              <span className="comments-count">
                评论 {meta.comments}
              </span>
              <span className="likes-count">
                喜欢 {meta.likes}
              </span>
            </div>
          </div>
        </div>
        <div className="header-tags" title="标签">
          <Icon type="tags" theme="outlined" />
          {tags.map((item, i) => (
            <span key={item._id} className="tag">
              {item.name}
            </span>
          ))}
        </div>
      </div>
    )
  }
  public render() {
    const { isLoading, articleDetail } = this.props.articleDetail
    const { content, toc, title, meta } = articleDetail
    return (
      <div className='article-container' style={{ minHeight: window.innerHeight }}>
        <div
          style={{ width: '20%' }}
          className="quick-nav"
          dangerouslySetInnerHTML={{
            __html: toc ? toc : '',
          }}
        />
        <div className="article-title">{title}</div>
        <div >
          <div className='detail-content'>
            {this.renderHeader()}
            {isLoading ? <Loading /> : ''}
            <div className='article-content'>
              <div
                id="content"
                className="article-detail"
                dangerouslySetInnerHTML={{ __html: content ? content : '', }}
              />
            </div>
            <div className="heart">
              {meta.currentUserLike ?
                <Button
                  type="danger"
                  size="large"
                  icon="heart"
                  disabled={true}
                  style={{ backgroundColor: '#1890ff', color: 'white' }}
                >
                  已赞</Button>
                : <Button
                  type="danger"
                  size="large"
                  icon="heart"
                  loading={isLoading}
                  onClick={this.likeArticle}>
                  点赞</Button>
              }
            </div>
            {this.renderCommentComponent()}
          </div>

        </div>
      </div>
    );
  }
  private handleCommentChange = (event: any) => {
    this.props.setDetaileState({
      [event.target.name]: event.target.value,
    })
  }
  private handleAddComment = () => {
    const { articleState } = this.props.articleDetail
    const { commentContent } = articleState
    const { userInfo } = this.props.userInfo
    const _id = getQueryStringByName('_id')
    if (!commentContent) {
      message.warning('请输入内容!', 1);
      return;
    }
    if (!userInfo._id) {
      message.warning('登录才能评论，请先登录！', 1);
    }
    this.props.postAddCommonet({
      _id,//文章ID
      user_id: userInfo._id,
      content: commentContent
    })
  }
  private renderCommentComponent() {
    const { articleState } = this.props.articleDetail
    const { isSubmitLoading, commentContent } = articleState
    const { userInfo } = this.props.userInfo
    return (
      <div className="comment-container">
        <div className="new-comment">
          <div className="avatar">
            <Avatar
              className="auth-logo"
              size={50}
              icon="user"
              src={userInfo.avatar}
            />
          </div>
          <div className="comment-box">
            <h3 style={{ fontSize: '16px' }}>{userInfo.name}</h3>
            <TextArea
              className="textarea"
              name="commentContent"
              value={commentContent}
              onChange={this.handleCommentChange}
              placeholder="文明社会，理性评论..."
              rows={4}
            />
            <div className="comment-btns">
              <Button
                style={{ marginRight: '12px' }}
                type="primary"
                loading={isSubmitLoading}
                onClick={this.handleAddComment}>
                提交
          </Button>
              <Button
                onClick={this.handleAddComment}
              >取消</Button>
            </div>
          </div>
        </div>

        <Comment />
      </div>
    )
  }
}
const mapStateToProps = (state: IDetailProps) => ({
  articleDetail: state.articleDetail,
  userInfo: state.userInfo//传递user
})

const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)

