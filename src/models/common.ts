import { PayloadActionCreator } from '@reduxjs/toolkit'

export interface IAsyncAction<A, B, C> {
  request: PayloadActionCreator<A>
  success: PayloadActionCreator<B>
  failure: PayloadActionCreator<C>
}

export interface IUserInfo {
  id: string
  name: string
  email: string
  avatar: string
  date: string
}

export interface IUserRegisterInfo {
  name: string
  email: string
  password: string
}

export interface IUserLoginInfo {
  email: string
  password: string
}

export interface IUserToken {
  token: string
}
