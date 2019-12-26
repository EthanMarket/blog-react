import * as React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Button, Avatar } from 'antd'
import { withRouter } from 'react-router-dom'
import Login from '../Login'
import { IUserProps } from "../Login/index.interface";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/userInfo/action'
import Register from '../Login/Register'
import store from 'store';
import './index.less'
const SubMenu = Menu.SubMenu;

interface IHeaderProps extends IUserProps {
  history: IHistory,
  location: ILocation,
  setUserState: Function
}
interface ILocation {
  pathname: string
}
interface IHistory {
  push: (pathname: string) => void
}
class HeaderNav extends React.Component<IHeaderProps> {

  headerInfo = [
    {
      key: '/',
      title: '首页',
      iconType: 'home',
      path: '/'
    },
    {
      key: '/directory',
      title: '目录',
      iconType: 'directory',
      path: '/directory'
    },
    {
      key: '/project',
      title: '项目',
      iconType: 'project',
      path: '/project'
    },
    {
      key: '/about',
      title: '关于',
      iconType: 'about',
      path: '/about'
    },
  ]
  private showLoginModal = () => {
    this.props.setUserState({
      loginVisible: true,
    })
  }
  private showRegisterModal = () => {
    this.props.setRegisterState({
      registerVisible: true,
    })
  }

  componentDidMount() {
    const userInfo = store.get('userInfo')
    this.props.setUserState(userInfo)
  }
  public render() {
    const { pathname } = this.props.location
    return (
      <div className='main-header' >
        <div className='header-icon'>
          <span>hi,Ethan</span>
        </div>
        <Menu
          className='header-menu'
          theme="light"
          mode="horizontal"
          selectedKeys={[pathname]}
        >
          {this.headerInfo.map(item => (
            <Menu.Item key={item.key} style={{ marginLeft: 20, marginRight: 20 }}>
              <Link to={item.path} className='header-title'>
                {item.title}
              </Link>
            </Menu.Item>
          ))
          }
        </Menu>
        {this.showUser()}
        <Login />
        <Register />
      </div>
    );
  }
  private handleLogout = () => {
    this.props.postUserLogout()
  }

  private showUser() {
    let { userInfo } = this.props.userInfo
    return userInfo._id ? (<Menu
      onClick={this.handleLogout}
      style={{
        width: 220,
        lineHeight: '64px',
        display: 'inline-block',
      }}
      mode="horizontal"
    >
      <SubMenu
        title={
          <span className="submenu-title-wrapper">
            <Avatar
              icon="user"
              src={userInfo.avatar}
              style={{ marginRight: 5 }}
            />
            {userInfo.name}
          </span>
        }
      >
        <Menu.Item key="logout">退出</Menu.Item>
      </SubMenu>
    </Menu>) : (< div className='header-login' >
      <Button
        type="primary"
        onClick={this.showLoginModal}
      > 登 录 </Button>
      <Button
        type="danger"
        style={{ marginLeft: 20 }}
        onClick={this.showRegisterModal}
      > 注 册 </Button>
    </div >
      )
  }
}



const Header: any = HeaderNav
const mapStateToProps = (state: IUserProps) => ({
  userInfo: state.userInfo//传递user
})

const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))