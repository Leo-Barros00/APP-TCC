import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AvaliationObject {
  selectedProviderId: string | null
}

const initialState: AvaliationObject = {
  selectedProviderId: null,
}

const avaliationSlice = createSlice({
  name: 'avaliation',
  initialState,
  reducers: {
    setSelectedProviderId(state, action: PayloadAction<string>) {
      return {
        ...state,
        selectedProviderId: action.payload,
      }
    },
    reset() {
      return initialState
    },
  },
})

export const { setSelectedProviderId, reset } = avaliationSlice.actions
export default avaliationSlice.reducer
