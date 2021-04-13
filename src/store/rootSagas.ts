import { all } from '@redux-saga/core/effects'

/* import authSagas from './auth/sagas'
import userSagas from './users/sagas' */

export default function* allSagas() {
  yield all([
    /* authSagas(), userSagas() */
  ])
}
