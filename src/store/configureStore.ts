import { combineReducers, configureStore } from '@reduxjs/toolkit'

import signUp from './reducers/signUp'
import addressData from './reducers/addressData'
import auth from './reducers/auth'
import user from './reducers/user'

const reducer = combineReducers({ signUp, addressData, auth, user })

const store = configureStore({ reducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
