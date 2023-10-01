import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ServiceObject {
  houseSelected: string | null
  providers: any[] | null
  providerIndexSelected: number | null
}

const initialState: ServiceObject = {
  houseSelected: null,
  providers: null,
  providerIndexSelected: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedProviderIndex(state, action: PayloadAction<number>) {
      return {
        ...state,
        providerIndexSelected: action.payload,
      }
    },
    setSelectedHouse({ houseSelected }, { payload }: PayloadAction<string>) {
      if (payload === houseSelected) return

      return {
        houseSelected: payload,
        providers: null,
        providerIndexSelected: null,
      }
    },
    insertProviders(state, action: PayloadAction<any[]>) {
      return {
        ...state,
        providers: action.payload,
      }
    },
    reset() {
      return initialState
    },
  },
})

export const { setSelectedHouse, setSelectedProviderIndex, insertProviders, reset } =
  servicesSlice.actions
export default servicesSlice.reducer
