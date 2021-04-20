import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { v4 as uuidv4 } from 'uuid'
import services from '../../services'
import { IAlertObject } from '../alert/actions'
import rootActions from '../rootActions'

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
    services.userAPI.setToken(localStorage.token)
  }
  try {
    const { data } = yield call(services.userAPI.loadUser)
    yield put(rootActions.authActions.loadUser.success(data))
  } catch (error) {
    localStorage.removeItem('token')
    yield put(rootActions.authActions.loadUser.failure(error))
  }
}

function* loginUser(action: ReturnType<typeof rootActions.authActions.loginUser.request>) {
  try {
    const { data } = yield call(services.userAPI.loginUser, action.payload)
    yield put(rootActions.authActions.loginUser.success(data))
    localStorage.setItem('token', data.token)
    yield call(loadUserInfo)
  } catch (err) {
    console.error('LOGIN FAILED')
    yield put(rootActions.authActions.loginUser.failure(err.response.data.errors))
  }
}

function* failedLogin(action: ReturnType<typeof rootActions.authActions.loginUser.failure>) {
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

export default function* allSagas() {
  yield all([
    takeLatest(rootActions.authActions.registerUser.request, requestRegister),
    takeLatest(rootActions.authActions.registerUser.failure, failedRegister),
    takeLatest(rootActions.authActions.loadUser.request, loadUserInfo),
    takeLatest(rootActions.authActions.loginUser.request, loginUser),
    takeLatest(rootActions.authActions.loginUser.failure, failedLogin)
  ])
}
