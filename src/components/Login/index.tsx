import React, { Component } from 'react';
import { Modal, Input, Icon, message, Button } from 'antd';
import { IUserProps } from "./index.interface";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/userInfo/action'
class Login extends React.Component<IUserProps> {

  private handleOk = () => {
    const { email, password } = this.props.userInfo.userInfo
    const reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
    );
    if (!email) {
      message.warn('邮箱不能为空！');
    } else if (!reg.test(email)) {
      message.warn('请输入格式正确的邮箱！');
    } else if (!password) {
      message.warn('密码不能为空');
    } else {
      this.props.postUserLogin({
        email,
        password
      })
    }
  }
  private handleChange = (event: any) => {
    this.props.setUserState({
      [event.target.name]: event.target.value,
    })
  }
  private handleGitHub() {

  }
  private handleCancel = () => {
    this.props.setUserState({
      loginVisible: false,
    })
  }
  public render() {
    const { userInfo } = this.props.userInfo
    const { email, password } = userInfo
    return (
      <Modal
        title="登录"
        style={{ top: '25%' }}
        visible={userInfo.loginVisible}
        onCancel={this.handleCancel}
        width={400}
        footer={null}
      >
        <div className="login-input">
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder="email"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <div className="login-submit">
          <Button
            style={{ width: '100%', marginBottom: '20px' }}
            type="primary"
            onClick={this.handleOk}
          >
            登录
          </Button>
          <Button style={{ width: '100%' }} onClick={this.handleGitHub}>
            github 授权登录
          </Button>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state: IUserProps) => ({
  userInfo: state.userInfo//传递user
})

const mapDispatchToProps = (dispatch: any) => ({ ...bindActionCreators(actions, dispatch) })
export default connect(mapStateToProps, mapDispatchToProps)(Login)