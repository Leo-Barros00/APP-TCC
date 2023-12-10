import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AvaliationObject {
  selectedProviderId: string | null
  selectedContractId: string | null
}

const initialState: AvaliationObject = {
  selectedProviderId: null,
  selectedContractId: null,
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
    setSelectedContractId(state, action: PayloadAction<string>) {
      return {
        ...state,
        selectedContractId: action.payload,
      }
    },
    reset() {
      return initialState
    },
  },
})

export const { setSelectedProviderId, setSelectedContractId, reset } = avaliationSlice.actions
export default avaliationSlice.reducer
