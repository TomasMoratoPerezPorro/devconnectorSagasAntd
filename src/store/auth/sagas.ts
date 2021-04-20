import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import services from '../../services'
import rootActions from '../rootActions'
import { v4 as uuidv4 } from 'uuid'
import { IAlertObject } from '../alert/actions'
import setAuthToken from '../../helpers/setAuthToken'

function* requestRegister(action: ReturnType<typeof rootActions.authActions.registerUser.request>) {
  try {
    const { data } = yield call(services.userAPI.registerUser, action.payload)
    yield put(rootActions.authActions.registerUser.success(data))
    localStorage.setItem('token', data.token)
  } catch (err) {
    console.error('REGISTER FAILED')
    yield put(rootActions.authActions.registerUser.failure(err.response.data.errors))
  }
}

function* failedRegister(action: ReturnType<typeof rootActions.authActions.registerUser.failure>) {
  const errors = action.payload
  let id = uuidv4()
  let alert: IAlertObject = {
    msg: errors[0].msg,
    alertType: 'danger',
    timeOut: 5000,
    id: id
  }
  yield put(rootActions.alertActions.setAlert(alert))
}

function* loadUserInfo() {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const { data } = yield call(services.userAPI.loadUser)
    yield put(rootActions.authActions.loadUser.success(data))
  } catch (error) {
    localStorage.removeItem('token')
    yield put(rootActions.authActions.loadUser.failure(error))
  }
}

export default function* allSagas() {
  yield all([
    takeLatest(rootActions.authActions.registerUser.request, requestRegister),
    takeLatest(rootActions.authActions.registerUser.failure, failedRegister),
    takeLatest(rootActions.authActions.loadUser.request, loadUserInfo)
  ])
}
