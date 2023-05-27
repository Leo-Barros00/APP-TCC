import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface LoggedUserState {
  name: string
  surname: string
  email: string
  password: string
  cpf: string
  gender: string
  birthDate: string
  addressId: string
  preferenceId: string | null
}

const initialState: LoggedUserState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  cpf: '',
  gender: '',
  birthDate: '',
  addressId: '',
  preferenceId: null,
}

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    insertLoggedUserInfo(state, action: PayloadAction<Partial<LoggedUserState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { insertLoggedUserInfo } = loggedUserSlice.actions
export default loggedUserSlice.reducer
