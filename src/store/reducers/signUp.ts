import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SignUpStep {
  Email,
  Name,
  BirthDate,
}

export interface SignUpState {
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
  documentImage: string
  personImage: string
}

const initialState: SignUpState = {
  step: SignUpStep.Email,
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  surname: '',
  cpf: '',
  birthDate: '',
  gender: '',
  stateId: '',
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
    reset() {
      return initialState
    },
  },
})

export const { nextStep, previousStep, insertSignUpInfo, reset } = signUpslice.actions
export default signUpslice.reducer
