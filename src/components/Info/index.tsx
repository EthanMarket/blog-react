import * as React from 'react';
import userLogo from '../../assets/img/userLogo.jpeg'
import { Tag } from 'antd';
import './index.less'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { IInfoProps } from './index.interface'
import * as actions from '../../redux/info/action'
import InfoUser from '../../assets/img/info-user.jpg';
interface checkItem {
  _id: string,
  name: string
}
class Info extends React.Component<IInfoProps> {
  public componentDidMount() {
    this.props.getTagList()
    this.props.getCategoryList()
    this.props.getFriendLinkList()
  }
  /**
   * 标签选中状态
   * @param item tag
   */
  private checkedTag(item: checkItem) {
    const tag_id = this.props.info.tag_id === item._id ? '' : item._id
    this.props.setInfoState({ tag_id })
  }
  private checkedCategory(item: checkItem) {
    const category_id = this.props.info.category_id === item._id ? '' : item._id
    this.props.setInfoState({ category_id })
  }

  private renderCategoryComponent() {
    const { categoryList, category_id } = this.props.info
    return categoryList.map((item, index) => {
      const { CheckableTag } = Tag
      const { _id, name } = item
      return (
        <CheckableTag
          className='item-tag'
          key={_id}
          checked={_id === category_id}
          onChange={() => this.checkedCategory(item)}>{name}</CheckableTag>
      )
    })
  }
  private renderLabelComponent() {
    const { tagList, tag_id } = this.props.info
    return tagList.map((item, index) => {
      const { _id, name } = item
      const { CheckableTag } = Tag
      return (
        <CheckableTag
          className='item-tag'
          key={_id}
          checked={_id === tag_id}
          onChange={() => this.checkedTag(item)}>{name}</CheckableTag>
      )
    })
  }

  private requestShipLinks() {
    const { linkList } = this.props.info
    return linkList.map(item => {
      const { name, url } = item
      return <Tag className='item-tag' color="cyan"><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></Tag>
    })
  }
  public render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='info-user'>
          <div>
            <img className='logo' src={userLogo} alt="user" />
            <p >hi,Ethan</p>
          </div>
        </div>
        <div className='info-category'>
          <p className='title'>文章分类</p>
          {this.renderCategoryComponent()}
        </div>
        <div className='info-container'>
          <p className='title'>标签云</p>
          {this.renderLabelComponent()}
        </div>
        <div className='info-container'>
          <p className='title'>友情链接</p>
          {this.requestShipLinks()}
        </div>
        <div className='info-container'>
          {/* <p className='title'>一个假的前端</p> */}
          <img src={InfoUser} alt="" />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state: IInfoProps) => ({
  info: state.info,
})
const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(Info)