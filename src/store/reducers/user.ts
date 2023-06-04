import { Preferences } from '@Typings/user'
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
  preference?: Preferences
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
  houses: [],
}

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    updatePreferences(state, action: PayloadAction<string>) {
      return {
        ...state,
        preferenceId: action.payload,
      }
    },
    insertHouse(state, action: PayloadAction<HouseState>) {
      return {
        ...state,
        houses: [...state.houses, action.payload],
      }
    },
    insertLoggedUserInfo(state, action: PayloadAction<Partial<LoggedUserState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { insertLoggedUserInfo, insertHouse, updatePreferences } =
  loggedUserSlice.actions
export default loggedUserSlice.reducer
