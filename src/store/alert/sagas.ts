import { all, delay, put, takeEvery } from 'redux-saga/effects'
import rootActions from '../rootActions'

function* showAlerts(action: ReturnType<typeof rootActions.alertActions.setAlert>) {
  yield delay(action.payload.timeOut)
  yield put(rootActions.alertActions.deleteAlert(action.payload.id))
}

export default function* watchAlerts() {
  console.log('LISTENING ACTION SET ALERT')
  yield all([takeEvery(rootActions.alertActions.setAlert, showAlerts)])
}
