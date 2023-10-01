import React from 'react'
import styled from 'styled-components/native'

import { ISignUpErrors } from './interface'

const TextError = styled.Text`
  color: red;
  font-family: 'Poppins-SemiBold';
  font-size: 18px;
  padding-left: 8px;
`

const SignUpErrors: React.FC<ISignUpErrors> = ({ errors }) => {
  return (
    <>
      {errors.map((error, index) => (
        <TextError key={`form-error-${index}`}>• {error}</TextError>
      ))}
    </>
  )
}

export default SignUpErrors
