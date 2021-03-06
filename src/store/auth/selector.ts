import { createSelector } from 'reselect'
import { IAuthState } from './reducer'
import { getReducer } from '../../helpers/common'
import { REDUCERNAMES } from '../../helpers/enum'

const reducer = getReducer<IAuthState>(REDUCERNAMES.AUTH)

const isAuthenticated = createSelector(reducer, state => state.isAuthenticated)
const loading = createSelector(reducer, state => state.loading)
const user = createSelector(reducer, state => state.user)

const authSelectors = {
  isAuthenticated,
  loading,
  user
}

export default authSelectors
