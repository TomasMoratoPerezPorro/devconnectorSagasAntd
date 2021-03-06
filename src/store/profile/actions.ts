import { createAction } from '@reduxjs/toolkit'
import { createAsyncAction } from '../../helpers/common'
import { IProfileObject } from '../../models/profile'

export const clearProfile = createAction('PROFILE clearProfile')

/* Request - Success - Failure */

export const getCurrentProfile = createAsyncAction<undefined, any, any>('PROFILE Get Profile')
export const createProfile = createAsyncAction<IProfileObject | any, any, undefined>(
  'PROFILE Create Profile'
)
export const updateProfile = createAsyncAction<IProfileObject, any, any>('PROFILE Update Profile')
export const deleteProfile = createAsyncAction<any, any, any>('PROFILE Delete Profile')

export const addExperience = createAsyncAction<undefined, undefined, undefined>(
  'PROFILE Add Experience'
)
