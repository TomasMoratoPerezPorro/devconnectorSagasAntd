import { createReducer } from '@reduxjs/toolkit'
import rootActions from '../rootActions'
import { IAlertObject } from './actions'

export interface IAlertsState {
  alerts: IAlertObject[] | []
}

const initState: IAlertsState = {
  alerts: []
}

export default createReducer(initState, builder => {
  builder
    .addCase(rootActions.alertActions.setAlert, (state, action) => ({
      ...state,
      alerts: [...state.alerts, action.payload]
    }))
    .addCase(rootActions.alertActions.deleteAlert, (state, action) => ({
      alerts: state.alerts.filter((alert: IAlertObject) => alert.id !== action.payload)
    }))
})
