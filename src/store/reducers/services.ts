import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ServiceObject {
  houseSelected: string | null
  providers: any[] | null
}

const initialState: ServiceObject = {
  houseSelected: null,
  providers: null,
}

const servicesSlide = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedHouse(state, action: PayloadAction<string>) {
      return {
        ...state,
        houseSelected: action.payload,
      }
    },
    reset() {
      return initialState
    },
  },
})

export const { setSelectedHouse, reset } = servicesSlide.actions
export default servicesSlide.reducer
