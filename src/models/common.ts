import { PayloadActionCreator } from '@reduxjs/toolkit'
import { Rule } from 'antd/lib/form'
import React from 'react'

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

export interface IFormItem {
  name: string
  label?: string
  extra?: string
  disabled?: boolean
  type: 'number' | 'date' | 'text' | 'select' | 'textArea'
  valueOptions?: string[]
  rules?: Rule
  placeholder?: string
  prefix?: React.ReactNode
}
