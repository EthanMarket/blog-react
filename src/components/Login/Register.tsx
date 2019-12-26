import React, { Component } from 'react';
import { Modal, Input, Icon, message, Button } from 'antd';
import { IUserProps } from "./index.interface";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/userInfo/action'
class Register extends React.Component<IUserProps> {

  private handleOk = () => {
    const {
      name,
      email,
      password,
      phone,
      introduce,
      type
    } = this.props.userInfo.registerInfo

    const reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
    ); //正则表达式
    const rePhone = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!email) {
      message.warn('邮箱不能为空！');
    } else if (!reg.test(email)) {
      message.warn('请输入格式正确的邮箱！');
    } else if (!name) {
      message.warn('用户名不能为空！');
    } else if (!password) {
      message.warn('密码不能为空！');
    } else if (phone && !rePhone.test(phone)) {
      message.warn('请输入正确的手机号!');
    } else {
      this.props.postUserRegister({
        name,
        email,
        password,
        phone,
        introduce,
        type
      })
    }
  }
  private handleChange = (event: any) => {
    this.props.setRegisterState({
      [event.target.name]: event.target.value,
    })
  }
  private handleOAuth() {

  }
  private handleCancel = () => {
    this.props.setRegisterState({
      registerVisible: false,
    })
  }
  public render() {
    const { registerInfo } = this.props.userInfo
    const {
      name,
      email,
      password,
      phone,
      introduce,
      registerVisible
    } = registerInfo
    return (

      <Modal
        title="注册"
        style={{ top: '18%' }}
        visible={registerVisible}
        onCancel={this.handleCancel}
        width={500}
        footer={null}
      >
        <div className="register-input">
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="name"
            placeholder="请输入用户名"
            value={name}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            name="password"
            placeholder="请输入密码"
            value={password}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="phone"
            placeholder="请输入手机（可为空）"
            value={phone}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="introduce"
            placeholder="请输入个人介绍（可为空）"
            value={introduce}
            onChange={this.handleChange}
          />
        </div>
        <div className="register-submit">
          <Button
            style={{ width: '100%', marginBottom: '20px' }}
            type="primary"
            onClick={this.handleOk}
          >
            注册
          </Button>
          <Button style={{ width: '100%' }} onClick={this.handleOAuth}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Register)