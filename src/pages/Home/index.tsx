import * as React from 'react';
import './index.less'
import { Icon } from 'antd';
import ItemLogo from '../../assets/img/item-logo.png'
import { Link } from 'react-router-dom';
import { timeToLocal } from '../../common/utils';
import * as actions from '../../redux/home/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroller';
import LoadNoMore from '../../components/LoadNoMore'
import Loading from '../../components/Loading'
import { IHomeProps } from './index.interface'
import { getScrollTop, getWindowHeight, getDocumentHeight } from '../../common/utils'
class Home extends React.Component<IHomeProps> {

  public componentDidMount() {
    this.props.setHomeListState({ loading: true })
    const { tag_id, category_id } = this.props.info
    this.props.getHomeList({
      keyword: "",
      likes: "",
      pageNum: 0,
      state: 1,
      tag_id,
      category_id
    })

    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight()) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        const { hasMore, loading } = this.props.home
        if (hasMore && !loading) {
          this.props.setHomeListState({ scrollLoading: true })
        }
      }
    };
  }
  componentWillReceiveProps(nextProps: IHomeProps) {
    const { tag_id, category_id } = nextProps.info
    //无论点击分类，还是点击标签都应该刷新页面
    const refresh = this.props.info.tag_id !== tag_id || this.props.info.category_id !== category_id
    if (refresh) {
      this.props.setHomeListState({
        pageNum: 0
      })
      this.props.getHomeList({
        pageNum: 1,
        state: 1,
        tag_id,
        category_id
      })
    }
  }
  creatItem = () => {
    const { list } = this.props.home
    return list.map((item, index) => {
      const {
        title,
        desc,
        img_url,
        meta,
        create_time,
        _id
      } = item
      const {
        views,
        likes,
        comments
      } = meta
      const cover = img_url ? img_url : ItemLogo
      return (
        <li key={index} className='home-item'>
          <div className='item-content'>
            <Link
              className="item-link"
              target="_blank"
              to={`/articledetail?_id=${_id}`}
            >
              <span className='title'>{title}</span>
              <p className='content'>{desc}</p>
            </Link>
            <div className='item-buttom'>
              <span><Icon className='icon' type="eye" theme="outlined" /> {views}</span>
              <span><Icon className='icon' type="message" theme="outlined" />{comments}</span>
              <span><Icon className='icon' type="heart" theme="outlined" />{likes}</span>
              <span>{timeToLocal(create_time)}</span>
            </div>
          </div>
          <div className='item-img'>
            <img className="wrap-img" src={cover} alt="文章封面" />
          </div>
        </li>)
    })
  }
  _loadMore = (pageNum: Number) => {
    const { hasMore } = this.props.home
    if (hasMore) {
      this.props.setHomeListState({ pageNum, loading: true, scrollLoading: false })
      this.props.getHomeList({ pageNum })
    }
  }
  private _loadComponent() {
    const { hasMore } = this.props.home
    return hasMore ? <Loading /> : <LoadNoMore />
  }
  public render() {
    const { scrollLoading } = this.props.home
    const need = scrollLoading ? true : false
    return (
      <div className='home-content' >
        <InfiniteScroll
          pageStart={0}
          loadMore={this._loadMore}
          hasMore={need}
        >
          <ul>
            {this.creatItem()}
          </ul>
          {this._loadComponent()}
        </InfiniteScroll>
      </div >
    );
  }
}

const mapStateToProps = (state: IHomeProps) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(Home)
