import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NeighborhoodState {
  name: string
}
interface AddressState {
  description: string
  number: string
  neighborhood: NeighborhoodState
}
interface HouseState {
  metersBuilt: string
  address: AddressState
}

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
  houses: HouseState[]
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
    insertHouse(state) {
      console.log(state)
    },
    insertLoggedUserInfo(state, action: PayloadAction<Partial<LoggedUserState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { insertLoggedUserInfo, insertHouse } = loggedUserSlice.actions
export default loggedUserSlice.reducer
