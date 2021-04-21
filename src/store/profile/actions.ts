import { createAsyncAction } from '../../helpers/common'
import { IProfileObject } from '../../models/profile'

export const getCurrentProfile = createAsyncAction<undefined, any, any>('PROFILE Get Profile')
export const createProfile = createAsyncAction<IProfileObject, any, any>('PROFILE Create Profile')
export const updateProfile = createAsyncAction<IProfileObject, any, any>('PROFILE Update Profile')
export const deleteProfile = createAsyncAction<any, any, any>('PROFILE Delete Profile')
