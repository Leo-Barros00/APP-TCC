import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthObject } from '@Typings/auth'

const initialState: AuthObject = {
  isLogged: false,
  token: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    insertAuthInfo(state, action: PayloadAction<Partial<AuthObject>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    reset() {
      return initialState
    },
  },
})

export const { insertAuthInfo, reset } = authSlice.actions
export default authSlice.reducer
