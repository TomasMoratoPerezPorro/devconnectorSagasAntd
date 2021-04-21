import { combineReducers, Reducer } from '@reduxjs/toolkit'

/* import globalReducer from './global/reducer'
import authReducer from './auth/reducer'
import userReducer from './users/reducer' */

import alertReducer from './alert/reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'

export default function createRootReducer(): Reducer {
  return combineReducers({
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer
    /* global: globalReducer,
    auth: authReducer,
    users: userReducer */
  })
}
