import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ServiceObject {
  houseSelected: string | null
  providers: any[] | null
  providerIndexSelected: number | null
  startDate: string | null
  serviceHours: string | null
}

const initialState: ServiceObject = {
  houseSelected: null,
  providers: null,
  providerIndexSelected: null,
  startDate: null,
  serviceHours: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setStartDate(state, action: PayloadAction<string>) {
      return {
        ...state,
        startDate: action.payload,
      }
    },
    setServiceHours(state, action: PayloadAction<string>) {
      return {
        ...state,
        serviceHours: action.payload,
      }
    },
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
        startDate: null,
        serviceHours: null,
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

export const {
  setServiceHours,
  setStartDate,
  setSelectedHouse,
  setSelectedProviderIndex,
  insertProviders,
  reset,
} = servicesSlice.actions
export default servicesSlice.reducer
