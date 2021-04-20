import { createAsyncAction } from '../../helpers/common'

import { IUserInfo, IUserLoginInfo, IUserRegisterInfo } from '../../models/common'

export const registerUser = createAsyncAction<IUserRegisterInfo, IUserInfo | null, any>(
  'AUTH Register User'
)

export const loginUser = createAsyncAction<IUserLoginInfo, IUserInfo | null, any>('AUTH Login User')

export const loadUser = createAsyncAction<any, IUserInfo | null, any>('AUTH Load User')
