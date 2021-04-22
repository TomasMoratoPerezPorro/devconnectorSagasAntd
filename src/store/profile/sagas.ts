import { all, call, delay, put, takeLatest } from 'redux-saga/effects'
import services from '../../services'
import rootActions from '../rootActions'

function* getUserProfile() {
  try {
    const { data } = yield call(services.userAPI.getCurrentUserProfile)
    yield delay(1000)
    yield put(rootActions.profileActions.getCurrentProfile.success(data))
  } catch (err) {
    console.error('PROFILE ERROR: ' + err.response.statusText)
    yield put(rootActions.profileActions.getCurrentProfile.failure(err.response))
  }
}

function* createProfile(
  action: ReturnType<typeof rootActions.profileActions.createProfile.request>
) {
  try {
    const { data } = yield call(services.userAPI.createUserProfile, action.payload)
    yield put(rootActions.profileActions.createProfile.success(data))
  } catch (err) {
    console.error('CREATE PROFILE ERROR: ' + err.response.statusText)
    yield put(rootActions.profileActions.createProfile.failure)
  }
}

export default function* watchProfile() {
  yield all([
    takeLatest(rootActions.profileActions.getCurrentProfile.request, getUserProfile),
    takeLatest(rootActions.profileActions.createProfile.request, createProfile)
  ])
}
