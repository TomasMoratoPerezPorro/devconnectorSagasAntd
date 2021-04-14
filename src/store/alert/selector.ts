import { createSelector } from 'reselect'
import { IAlertsState } from './reducer'

const getReducer = ({ alerts }: { alerts: IAlertsState }) => alerts

const users = createSelector(getReducer, state => state.alerts)

const alertSelectors = {
  users
}

export default alertSelectors
