import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createRootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import rootSagas from './rootSagas'

const rootReducer = createRootReducer()

const sagaMiddleware = createSagaMiddleware()

const middleware =
  process.env.NODE_ENV === 'development' ? [logger, sagaMiddleware] : [sagaMiddleware]

function createCustomStore(): EnhancedStore {
  const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: process.env.NODE_END !== 'production'
  })

  sagaMiddleware.run(rootSagas)

  return store
}

const store = createCustomStore()

export default store
