import { createAction } from '@reduxjs/toolkit'
import { IAsyncAction } from '../models/common'

export const createAsyncAction = <A, B, C>(actionType: string): IAsyncAction<A, B, C> => {
  return {
    request: createAction<A>(`${actionType} Request`),
    success: createAction<B>(`${actionType} Success`),
    failure: createAction<C>(`${actionType} Failure`)
  }
}
