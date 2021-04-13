import { all, put, takeLatest } from 'redux-saga/effects'
import rootActions from '../rootActions'
import { IAlertObject } from './actions'

function* onSetAlert(action: IAlertObject) {
  yield put(rootActions.alertActions.setAlert(action))
}

export default function* actionSagas() {
  yield all([takeLatest(rootActions.alertActions.setAlert, onSetAlert)])
  /* yield takeLatest(rootActions.alertActions.deleteAlert, onSetAlert) */
}
