import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ServiceObject {
  houseSelected: string | null
  providers: any[] | null
}

const initialState: ServiceObject = {
  houseSelected: null,
  providers: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedHouse({ houseSelected }, { payload }: PayloadAction<string>) {
      if (payload === houseSelected) return

      return {
        houseSelected: payload,
        providers: null,
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

export const { setSelectedHouse, insertProviders, reset } = servicesSlice.actions
export default servicesSlice.reducer
