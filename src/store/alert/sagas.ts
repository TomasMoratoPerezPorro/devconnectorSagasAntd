import { all, put, takeLatest, delay } from 'redux-saga/effects'
import rootActions from '../rootActions'

function* onSetAlert(action: ReturnType<typeof rootActions.alertActions.setAlert>) {
  yield put(rootActions.alertActions.setAlert(action.payload))
  console.error('ACTION SET ALERT')
  yield delay(2000)
  console.error('ACTION DELAY')
  yield put(rootActions.alertActions.deleteAlert(action.payload.id))
  console.error('ACTION DELETE ALERT')

  /* setTimeout(() => yield put(rootActions.alertActions.deleteAlert(action.payload.id)), 500) */
}

export default function* actionSagas() {
  console.log('ACTION SET ALERT')
  yield all([takeLatest(rootActions.alertActions.setAlert, onSetAlert)])
}
