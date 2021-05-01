import { createReducer, isAnyOf } from '@reduxjs/toolkit'
import { IProfileObject } from '../../models/profile'
import rootActions from '../rootActions'

export interface IProfileState {
  profile: IProfileObject | null
  profiles: IProfileObject[] | []
  repos: []
  loading: boolean
  error: any
}

const initState: IProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
  error: {}
}

export default createReducer(initState, builder => {
  builder
    .addCase(rootActions.profileActions.clearProfile, state => ({
      ...state,
      profile: null,
      repos: [],
      loading: false,
      error: {}
    }))
    .addMatcher(
      isAnyOf(
        rootActions.profileActions.getCurrentProfile.success,
        rootActions.profileActions.addExperience.success,
        rootActions.profileActions.createProfile.success
      ),
      (state, action) => ({
        ...state,
        profile: action.payload,
        loading: false,
        error: {}
      })
    )
    .addMatcher(
      isAnyOf(
        rootActions.profileActions.getCurrentProfile.failure,
        rootActions.profileActions.createProfile.failure,
        rootActions.profileActions.addExperience.failure
      ),
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload
      })
    )
    .addMatcher(
      isAnyOf(
        rootActions.profileActions.getCurrentProfile.request,
        rootActions.profileActions.createProfile.request,
        rootActions.profileActions.addExperience.request
      ),
      state => ({
        ...state,
        loading: true
      })
    )
})
