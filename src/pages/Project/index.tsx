import * as React from 'react';
import { getScrollTop, getWindowHeight, getDocumentHeight } from '../../common/utils'
import LoadNoMore from '../../components/LoadNoMore'
import ItemLogo from '../../assets/img/item-logo.png'
import Loading from '../../components/Loading'
import { timeToSubLocal } from '../../common/utils'
import { Card } from 'antd';
import *  as api from '../../common/api'
import './index.less'
import InfiniteScroll from 'react-infinite-scroller';
export interface IProjectProps {
}
const { Meta } = Card;
export default class Project extends React.Component<IProjectProps> {
  state = {
    scrollLoading: false,
    hasMore: false,
    loading: true,
    pageNum: 0,
    list: []
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.getProjectList()
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight()) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        this.setState({ scrollLoading: true });
      }
    };
  }


  private async getProjectList() {
    const response = await api.reqProjectList({
      likes: "",
      pageNum: 0,
      pageSize: 10,
      article: 1
    })
    const { data } = response
    console.log('getProjectList', response);
    if (data.code === 0) {
      this.setState({ list: data.data.list })
    }
  }
  private _loadComponent() {
    const { hasMore } = this.state
    return hasMore ? <Loading /> : <LoadNoMore />
  }
  private _loadMore = (pageNum: Number) => {
    const { hasMore, loading } = this.state
    if (hasMore) {
      this.setState({ pageNum, loading: true, scrollLoading: false });
      this.getProjectList()
    }
  }
  private renderItem() {
    return this.state.list.map((item, index) => {
      const { title, content, url, img, start_time, end_time } = item
      const cover = img ? img : ItemLogo
      return (<li key={index}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Card
            hoverable
            cover={
              <div className="cover-container">
                <img className="img-cover" alt={title} src={cover} />
              </div>
            }>
            <div className='project-disc'>
              <span className='project-title'>{title}</span>
              <span className='project-content'>{content}</span>
              <span className='project-time'>
               {timeToSubLocal(start_time)} — {timeToSubLocal(end_time)}
              </span>
            </div>
          </Card>
        </a>
      </li>
      )
    })

  }
  public render() {
    const { scrollLoading } = this.state
    const need = scrollLoading ? true : false
    return (
      <div className='project-content' >
        <InfiniteScroll
          pageStart={0}
          loadMore={this._loadMore}
          hasMore={need}
        >
          <ul className='project-list'>
            {this.renderItem()}
          </ul>
          {this._loadComponent()}
        </InfiniteScroll>
      </div >
    );
  }
}
