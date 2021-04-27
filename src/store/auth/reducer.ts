import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { IUserInfo } from '../../models/common'
import rootActions from '../rootActions'
import { registerUser } from './actions'

export interface IAuthState {
  token: string | null
  isAuthenticated: boolean | null
  loading: boolean
  user: IUserInfo | null
}

const initialState: IAuthState = {
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
    .addMatcher(
      isAnyOf(
        rootActions.authActions.registerUser.success,
        rootActions.authActions.loginUser.success
      ),
      (state, action) => ({
        ...state,
        loading: false,
        token: action.payload.token,
        isAuthenticated: true
      })
    )
    .addMatcher(
      isAnyOf(
        rootActions.authActions.loadUser.failure,
        rootActions.authActions.loginUser.failure,
        rootActions.authActions.registerUser.failure,
        rootActions.authActions.logout
      ),
      state => ({
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null
      })
    )
    .addMatcher(
      isAnyOf(
        rootActions.authActions.registerUser.request,
        rootActions.authActions.loadUser.request,
        rootActions.authActions.loginUser.request
      ),
      state => ({
        ...state,
        loading: true
      })
    )
})
