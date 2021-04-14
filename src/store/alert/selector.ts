import { createSelector } from 'reselect'
import { IAlertsState } from './reducer'

const getReducer = ({ alert }: { alert: IAlertsState }) => alert

const alerts = createSelector(getReducer, state => state.alerts)

const alertSelectors = {
  alerts
}

export default alertSelectors
