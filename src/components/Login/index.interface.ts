
export interface IReqParams {
  email: Number,
  password: Number,
}
export interface IUserState {
  userInfo: {
    loginVisible: boolean,
    _id: string,
    email: string,
    password: string,
    github_id: "",
    name: "",
    type: 0,
    phone: "",
    img_url: "",
    introduce: "",
    avatar: "",
    location: "",
    create_time: "",
    update_time: "",
  },
  registerInfo: {
    registerVisible: boolean,
    email: string,
    name: string,
    password: string,
    phone: string,
    introduce: string,
    type: string,
  }
}

export interface IUserProps {
  setUserState: Function,
  postUserLogin: Function,
  postUserLogout: Function,
  postUserRegister: Function,
  setRegisterState: Function,
  userInfo: IUserState,
}