import { createSelector } from 'reselect'
import { getReducer } from '../../helpers/common'
import { REDUCERNAMES } from '../../helpers/enum'
import { IProfileState } from './reducer'

const reducer = getReducer<IProfileState>(REDUCERNAMES.PROFILE)

const profile = createSelector(reducer, state => state.profile)
const loading = createSelector(reducer, state => state.loading)

const authSelectors = {
  profile,
  loading
}

export default authSelectors
