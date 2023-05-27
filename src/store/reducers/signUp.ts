import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'

import { mainApi } from '@Api/index'

export enum SignUpStep {
  Email,
  Name,
  BirthDate,
}

interface SignUpState {
  step: SignUpStep
  email: string
  password: string
  passwordConfirm?: string
  name: string
  surname: string
  cpf: string
  birthDate: string
  gender: string
  stateId: string
  cityId: string
  neighborhoodId: string
  addressDescription: string
  addressNumber: string
}

const initialState: SignUpState = {
  step: SignUpStep.Email,
  email: 'filipe@gmail.com',
  password: '123415263',
  passwordConfirm: '123415263',
  name: 'filipe',
  surname: 'neves',
  cpf: '02732320536',
  birthDate: '',
  gender: '',
  stateId: '',
  cityId: '',
  neighborhoodId: '',
  addressDescription: 'rua E',
  addressNumber: '710',
}

export const sendUserData = createAsyncThunk<AxiosResponse<any, any>>(
  'data/sendUserData',
  async (_, { getState }) => {
    const signUpData = (getState() as any).signUp as SignUpState

    try {
      const response = await mainApi.post('/users', signUpData)
      return response.data
    } catch (error) {
      const err = error as AxiosError
      return err.response?.data
    }
  }
)

const signUpslice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step++
    },
    previousStep(state) {
      state.step--
    },
    insertSignUpInfo(state, action: PayloadAction<Partial<SignUpState>>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})

export const { nextStep, previousStep, insertSignUpInfo } = signUpslice.actions
export default signUpslice.reducer
