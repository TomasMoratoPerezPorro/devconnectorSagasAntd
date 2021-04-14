import { all, put, delay, takeLeading } from 'redux-saga/effects'
import rootActions from '../rootActions'

function* showAlerts(action: ReturnType<typeof rootActions.alertActions.setAlert>) {
  yield put(rootActions.alertActions.setAlert(action.payload))
  console.log('AFTER ACTION SET ALERT')
  yield delay(2000)
  console.log('AFTER DELAY')
  yield put(rootActions.alertActions.deleteAlert(action.payload.id))
  console.log('AFTER ACTION DELETE')
}

export default function* watchAlerts() {
  console.log('LISTENING ACTION SET ALERT')
  yield all([takeLeading(rootActions.alertActions.setAlert, showAlerts)])
}
