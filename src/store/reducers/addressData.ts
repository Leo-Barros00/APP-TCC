import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { State } from '@Typings/address'

interface DataState {
  data: State[] | null
}

const initialState: DataState = {
  data: null,
}

const dataSlice = createSlice({
  name: 'addressData',
  initialState,
  reducers: {
    insertAddressData(_, { payload }: PayloadAction<State[]>) {
      return {
        data: payload,
      }
    },
  },
})

export const { insertAddressData } = dataSlice.actions
export default dataSlice.reducer
