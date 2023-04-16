import { combineReducers, configureStore } from '@reduxjs/toolkit'

import signUp from './reducers/signUp'
import addressData from './reducers/addressData'

const reducer = combineReducers({ signUp, addressData })

const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
