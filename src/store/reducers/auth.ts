import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Token {
  value: string
  expiresIn: number
}

export interface AuthState {
  isLogged: boolean
  token: Token | null
  refreshToken: Token | null
}

const initialState: AuthState = {
  isLogged: false,
  token: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    insertAuthInfo(state, action: PayloadAction<Partial<AuthState>>) {
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
