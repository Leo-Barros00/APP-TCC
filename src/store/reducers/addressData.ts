import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import api from '@Api/index'
import { City } from 'src/typings'

interface DataState {
  data: City[] | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DataState = {
  data: null,
  status: 'idle',
  error: null,
}

const fetchAddressData = createAsyncThunk<City[]>('data/fetchAddressData', async () => {
  const response = await api.get('/address/cities')
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
      .addCase(fetchAddressData.fulfilled, (state, action: PayloadAction<City[]>) => {
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
