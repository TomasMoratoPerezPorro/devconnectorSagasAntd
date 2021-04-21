import { createAction } from '@reduxjs/toolkit'
import { createAsyncAction } from '../../helpers/common'

import { IUserInfo, IUserLoginInfo, IUserRegisterInfo, IUserToken } from '../../models/common'

export const registerUser = createAsyncAction<IUserRegisterInfo, IUserToken, any>(
  'AUTH Register User'
)

export const loginUser = createAsyncAction<IUserLoginInfo, IUserToken, any>('AUTH Login User')

export const logout = createAction('[AUTH] Logout')

export const loadUser = createAsyncAction<any, IUserInfo | null, any>('AUTH Load User')
