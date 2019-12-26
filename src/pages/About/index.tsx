import * as React from 'react';
import './index.less'
export interface IAboutProps {
}

export default class About extends React.Component<IAboutProps> {
  state = {
    github: 'https://github.com/EthanMarket'
  }
  public render() {
    return (
      <div className='about-container'>
        <div className='about-header'>
          <span className='about-title'>about</span>
        </div>
        <div className='about-blogger'>
          <h2>
            关于博主
        </h2>
          <ul>
            <li>博主7年原生Android开发经验，深入理解java、JavaScript，熟练使用kotlin、typescript、dart</li>
            <li>目前主要从事关于Android手机，原生部分、ReactNative、React相关内容开发，新框架新技术探索</li>
            <li>上一份手机系统公司中，主要负责Android手机Application Framework中的systemUI等轻ROM内容，以及手机性能优化</li>
          </ul>
        </div>
        <div className='blog-position'>
          <h2>博客定位</h2>
          <ul>
            <li>Android原生开发研究</li>
            <li>移动端跨平台技术研究</li>
            <li>web端技术研究</li>
          </ul>
        </div>
        <div className='blogger-contact'>
          <h2>联系博主</h2>
          <ul>
            <li>QQ：454360996</li>
            <li>邮箱：reflactyi@gmail.com</li>
            <li>GitHub：
              <a href={this.state.github} target="_blank" rel="noopener noreferrer">EthanMarket</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
