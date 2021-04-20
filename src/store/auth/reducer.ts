import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { IUserInfo } from '../../models/common'
import rootActions from '../rootActions'

export interface IAuthSate {
  token: string | null
  isAuthenticated: boolean | null
  loading: boolean
  user: IUserInfo | null
}

const initialState: IAuthSate = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
}

export default createReducer(initialState, builder => {
  builder
    .addCase(rootActions.authActions.loadUser.success, (state, action) => ({
      ...state,
      isAuthenticated: true,
      loading: false,
      user: action.payload
    }))
    .addCase(rootActions.authActions.loadUser.failure, state => ({
      ...state,
      loading: false,
      token: null,
      isAuthenticated: false,
      user: null
    }))
    .addCase(rootActions.authActions.registerUser.request, state => ({
      ...state,
      loading: true
    }))
    .addCase(rootActions.authActions.registerUser.success, (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload
    }))
    .addMatcher(
      isAnyOf(
        rootActions.authActions.registerUser.request,
        rootActions.authActions.loadUser.request
      ),
      state => ({
        ...state,
        loading: true
      })
    )
    .addMatcher(
      isAnyOf(
        rootActions.authActions.registerUser.success,
        rootActions.authActions.registerUser.failure
      ),
      state => ({
        ...state,
        loading: false
      })
    )
})
