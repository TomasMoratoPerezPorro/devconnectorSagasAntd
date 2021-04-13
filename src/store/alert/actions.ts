import { createAction } from '@reduxjs/toolkit'

export interface IAlertObject {
  msg: string
  alertType: number
  timeOut: number
  id: string
}

export const setAlert = createAction<IAlertObject>('[ALERT] Set Alert')
export const deleteAlert = createAction<string>('[ALERT] Delete Alert')
