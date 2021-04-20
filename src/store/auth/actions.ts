import { createAsyncAction } from '../../helpers/common'

import { IUserInfo, IUserRegisterInfo } from '../../models/common'

export const registerUser = createAsyncAction<IUserRegisterInfo, IUserInfo | null, any>(
  'AUTH Register User'
)
