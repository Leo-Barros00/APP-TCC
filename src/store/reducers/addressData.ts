import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { mainApi } from '@Api/index'
import { State } from '@Typings/address'

interface DataState {
  data: State[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DataState = {
  data: null,
  status: 'idle',
  error: null,
}

const fetchAddressData = createAsyncThunk<State[]>('data/fetchAddressData', async () => {
  const response = await mainApi.get('/address/states')
  return response.data
})

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddressData.fulfilled, (state, action: PayloadAction<State[]>) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchAddressData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? null
      })
  },
})

export { fetchAddressData }
export default dataSlice.reducer
