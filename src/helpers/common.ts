import { createAction } from '@reduxjs/toolkit'
import { IAsyncAction } from '../models/common'
import { LANGS } from './enum'

export const createAsyncAction = <A, B, C>(actionType: string): IAsyncAction<A, B, C> => {
  return {
    request: createAction<A>(`${actionType} Request`),
    success: createAction<B>(`${actionType} Success`),
    failure: createAction<C>(`${actionType} Failure`)
  }
}

export const getReducer = <T>(reducerKey: string): ((state: any) => T) => {
  return state => state[reducerKey]
}

export const toLocaleDate = (date: string | undefined, locale: LANGS): string => {
  try {
    if (date === undefined) throw Error('The date is undefined')
    const parsedDate = new Date(date)
    const lang = `${locale.toString()}-${locale.toString().toUpperCase()}`
    return `${parsedDate.toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}, ${parsedDate.toLocaleTimeString(lang)}`
  } catch (e) {
    return date?.toString() || '-'
  }
}
