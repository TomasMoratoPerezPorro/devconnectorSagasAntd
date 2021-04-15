import { all, call, put, takeLatest } from '@redux-saga/core/effects'
import { v4 as uuidv4 } from 'uuid'
import services from '../../services'
import { IAlertObject } from '../alert/actions'
import rootActions from '../rootActions'

function* requestRegister(action: ReturnType<typeof rootActions.authActions.registerUser.request>) {
  try {
    const { data } = yield call(services.userAPI.registerUser, action.payload)
    yield put(rootActions.authActions.registerUser.success(data))
  } catch (err) {
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
    yield put(rootActions.authActions.registerUser.failure(err.response.data.errors))
  }
}

export default function* allSagas() {
  yield all([takeLatest(rootActions.authActions.registerUser.request, requestRegister)])
}
