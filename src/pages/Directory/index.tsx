import * as React from 'react';
import { Timeline, Icon } from 'antd';
import './index.less'
import { IHomeProps } from '../Home/index.interface'
import *  as api from '../../common/api'
import { timeToLocal } from '../../common/utils';
export default class Directory extends React.Component<IHomeProps> {
  state = {
    list: [
      {
        _id: { year: '' },
        yearList: []
      }
    ]
  }
  componentDidMount() {
    this.getTimeAxis()
  }


  private async getTimeAxis() {
    const response = await api.reqArticleDirectory({
      article: 1
    })
    const { data } = response
    if (data.code === 0) {
      this.setState({ list: data.data.list })
    }
  }
  private renderDirectory(yearList = []) {
    return yearList.map((secondItem, index) => {
      const { title, create_time, _id } = secondItem
      return (
        <li key={_id} >
          <div className='directory-item'>
            <a href={`/articledetail?_id=${_id}`} target="_blank" rel="noopener noreferrer">
              <div>
                <span className='title'>{title}</span>
              </div>
            </a>
            <span className='time'>
              {timeToLocal(create_time)}
            </span>
          </div>
        </li>
      )
    })
  }
  private createItem() {
    const { list } = this.state
    return list.map((item, index) => {
      const { yearList } = item
      return (
        < Timeline.Item
          key={index}
          color={'red'}
          dot={< Icon type="clock-circle-o"
            className='dot-icon' />}>
          <h1>{item._id.year}</h1>
          <ul className='directory-content'>
            {this.renderDirectory(yearList)}
          </ul>
        </Timeline.Item >
      )

    })
  }

  public render() {
    return (
      <div className='archive-content'>
        <Timeline>
          <ul>
            {this.createItem()}
          </ul>
        </Timeline>
      </div>
    );
  }
}