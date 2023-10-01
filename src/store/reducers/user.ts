import { Preferences } from '@Typings/user'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StateState {
  name: string
  uf: string
}
interface CityState {
  name: string
  state: StateState
}

interface NeighborhoodState {
  name: string
  city: CityState
}
export interface AddressState {
  description: string
  number: string
  neighborhood: NeighborhoodState
}
interface HouseState {
  id: string
  metersBuilt: string
  address: AddressState
  animals: boolean
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
  approved: boolean
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
  approved: false,
}

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    updatePreferences(state, action: PayloadAction<Preferences>) {
      return {
        ...state,
        preferenceId: action.payload.id,
        preference: action.payload,
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
    reset() {
      return initialState
    },
  },
})

export const { insertLoggedUserInfo, insertHouse, updatePreferences, reset } =
  loggedUserSlice.actions
export default loggedUserSlice.reducer
