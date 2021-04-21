import { all } from '@redux-saga/core/effects'
import alertSagas from './alert/sagas'
import authSagas from './auth/sagas'
import profileSagas from './profile/sagas'

/* import authSagas from './auth/sagas'
import userSagas from './users/sagas' */

export default function* allSagas() {
  yield all([alertSagas(), authSagas(), profileSagas()])
}
