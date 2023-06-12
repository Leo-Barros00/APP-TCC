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
