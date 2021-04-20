import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import services from '../../services'
import rootActions from '../rootActions'
import { v4 as uuidv4 } from 'uuid'
import { IAlertObject } from '../alert/actions'

function* requestRegister(action: ReturnType<typeof rootActions.authActions.registerUser.request>) {
  try {
    const { data } = yield call(services.userAPI.registerUser, action.payload)
    yield put(rootActions.authActions.registerUser.success(data))
  } catch (err) {
    console.error('HELLO' + JSON.stringify(err))
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

export default function* allSagas() {
  yield all([
    takeLatest(rootActions.authActions.registerUser.request, requestRegister),
    takeLatest(rootActions.authActions.registerUser.failure, failedRegister)
  ])
}

/* console.log('ERROR' + JSON.stringify(err.response.data.errors)) */
/* const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error: any) => {
        let id = uuidv4()
        let alert: IAlertObject = {
          msg: error.msg,
          alertType: 'danger',
          timeOut: 5000,
          id: id
        }
        yield put(rootActions.alertActions.setAlert(alert))
      })
    } */
