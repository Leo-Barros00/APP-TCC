import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { subYears } from 'date-fns'

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
  cityId: string
  neighborhoodId: string
  addressDescription: string
  addressNumber: string
}

const initialState: SignUpState = {
  step: SignUpStep.Email,
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  surname: '',
  cpf: '',
  birthDate: subYears(new Date(), 18).toISOString(),
  gender: '',
  cityId: '',
  neighborhoodId: '',
  addressDescription: '',
  addressNumber: '',
}

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
