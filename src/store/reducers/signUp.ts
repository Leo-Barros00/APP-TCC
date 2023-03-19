import { createSlice } from '@reduxjs/toolkit';

enum SignUpStep {
  Email,
  Name,
  BirthDate
} 

interface SignUpState {
  step: SignUpStep
}

const initialState: SignUpState = {
  step: SignUpStep.Email,
}

const signUpslice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step++;
    },
    previousStep(state) {
      state.step--;
    },
  },
});

export const { nextStep, previousStep } = signUpslice.actions;
export default signUpslice.reducer;