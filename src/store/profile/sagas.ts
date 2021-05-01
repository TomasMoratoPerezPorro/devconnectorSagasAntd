import { all, call, delay, put, takeLatest } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import services from '../../services'
import { IAlertObject } from '../alert/actions'
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
    let id = uuidv4()
    let alert: IAlertObject = {
      msg: 'Profile saved succesfully',
      alertType: 'success',
      timeOut: 5000,
      id: id
    }
    yield put(rootActions.alertActions.setAlert(alert))
  } catch (err) {
    console.error('CREATE PROFILE ERROR: ' + err.response.statusText)
    yield put(rootActions.profileActions.createProfile.failure)
  }
}

function* addNewExperience(
  action: ReturnType<typeof rootActions.profileActions.addExperience.request>
) {
  try {
    const { data } = yield call(services.userAPI.addNewExperience, action.payload)
    yield put(rootActions.profileActions.addExperience.success(data))
    let id = uuidv4()
    let alert: IAlertObject = {
      msg: 'Profile Experience saved succesfully',
      alertType: 'success',
      timeOut: 5000,
      id: id
    }
    yield put(rootActions.alertActions.setAlert(alert))
  } catch (err) {
    console.error('PROFILE ERROR: ' + err.response.statusText)
    yield put(rootActions.profileActions.addExperience.failure)
  }
}

export default function* watchProfile() {
  yield all([
    takeLatest(rootActions.profileActions.getCurrentProfile.request, getUserProfile),
    takeLatest(rootActions.profileActions.createProfile.request, createProfile),
    takeLatest(rootActions.profileActions.addExperience.request, addNewExperience)
  ])
}
