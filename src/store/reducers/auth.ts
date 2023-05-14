import { createSlice } from '@reduxjs/toolkit'

interface Token {
  value: string
  expiresIn: number
}

interface AuthState {
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
  reducers: {},
})

export const {} = authSlice.actions
export default authSlice.reducer
