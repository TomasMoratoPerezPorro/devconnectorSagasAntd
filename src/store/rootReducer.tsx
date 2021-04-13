import { combineReducers, Reducer } from '@reduxjs/toolkit'

/* import globalReducer from './global/reducer'
import authReducer from './auth/reducer'
import userReducer from './users/reducer' */

export default function createRootReducer(): Reducer {
  return combineReducers({
    /* global: globalReducer,
    auth: authReducer,
    users: userReducer */
  })
}
