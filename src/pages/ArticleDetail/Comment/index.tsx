import * as React from 'react'
import { bindActionCreators } from 'redux';
import { message, Avatar, Spin, Modal, Input } from 'antd';
import { ICommentProps, IDetailState } from '../index.interface'
import { connect } from 'react-redux';
import { timeToLocal } from '../../../common/utils'
import './index.less'
import store from 'store';
import * as actions from '../../../redux/articleDetail/action'

const { TextArea } = Input;
interface IPopProps {
  visible: boolean,
  handleCancel: () => void,
  handleOk: () => void,
  content: string,
  handleChange: (event: any) => void
}

function CommentPop(props: IPopProps) {
  return (
    <Modal
      title="评论"
      style={{ top: '25%' }}
      visible={props.visible}
      onCancel={props.handleCancel}
      onOk={props.handleOk}
      width={600}>
      <div className="">
        <TextArea
          rows={4}
          name="content"
          placeholder="文明社会，理性评论"
          value={props.content}
          onChange={props.handleChange}
        />
      </div>
    </Modal>
  );
}

class Comment extends React.Component<ICommentProps> {

  private showCommentModal(action: any) {
    this.props.setDetaileState({
      ...action,
      popVisible: true
    })
  }
  private renderCommentList() {
    const { articleDetail } = this.props.articleDetail
    const { comments } = articleDetail
    return comments.map(item => {
      const { _id,
        user = { avatar: '', name: '', type: '' },
        content,
        create_time,
        other_comments
      } = item
      return (<div className="comment-item" key={_id}>
        <div className="item-header">
          <Avatar className="header-avator" size="large" icon="user" src={user.avatar} />
          <div className="header-info">
            <div className="name">
              {user.name}
              {user.type === 0 ? '(作者)' : ''}
            </div>
            <div className="time">
              {create_time ? timeToLocal(create_time) : ''}
            </div>
          </div>
        </div>
        <div className="comment-detail">{content}</div>
        <div className="append-comment">
          <div
            onClick={() => this.showCommentModal({
              comment_id: _id,
              to_user: user,
            })}
            className="message">
            <Avatar size="small" icon="message" /> 回复
          </div>
        </div>
        {other_comments.map(secondItem => {
          const { _id, user, create_time, content, to_user } = secondItem
          return (
            <div key={_id} className="second-item">
              <div className="item-header">
                <Avatar className="header-avator" size="large" icon="user" src={user.avatar} />
                <div className="header-info">
                  <div className="name">
                    {user.name}
                    {user.type === 0 ? '(作者)' : ''}
                  </div>
                  <div className="time">
                    {create_time ? timeToLocal(create_time) : ''}
                  </div>
                </div>
              </div>
              <div className="comment-detail">
                {'@' + to_user.name}
                {to_user.type === 0 ? '(作者)' : ''}：{content}
              </div>
              <div className="append-comment">
                <div
                  onClick={() => this.showCommentModal({
                    comment_id: item._id,
                    to_user: user,
                  })}
                  className="message">
                  <Avatar size="small" icon="message" /> 回复
                </div>
              </div>
            </div>
          );
        })}
      </div>)
    }
    )
  }
  private handlePoPChange = (event: any) => {
    this.props.setDetaileState({
      popContent: event.target.value
    })
  }
  private handleAddPopComment = () => {
    const { articleState, articleDetail } = this.props.articleDetail
    const userInfo = store.get('userInfo')
    const _id = articleDetail._id
    const {
      comment_id,
      to_user,
      popContent
    } = articleState
    this.props.postAddSecondComment({
      _id,
      comment_id,
      user_id: userInfo._id,
      to_user,
      content: popContent
    })

  }
  private handlePopCancel = () => {
    this.props.setDetaileState({
      popVisible: false
    })
  }

  render() {
    const { articleDetail, isLoading, articleState } = this.props.articleDetail
    const { meta } = articleDetail
    const { popContent, popVisible } = articleState
    return (
      <div className="comment-list">
        <div className="top-title">
          <span>{meta.comments} 条评论</span>
        </div>
        <Spin spinning={isLoading}>{this.renderCommentList()}</Spin>
        <CommentPop
          visible={popVisible}
          content={popContent}
          handleChange={this.handlePoPChange}
          handleOk={this.handleAddPopComment}
          handleCancel={this.handlePopCancel}
        />
      </div>
    )
  }
}


const mapStateToProps = (state: ICommentProps) => ({
  articleDetail: state.articleDetail,
})
const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(Comment)

