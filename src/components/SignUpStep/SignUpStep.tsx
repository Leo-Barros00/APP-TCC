import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import SignUpEmailStep from '../SignUpEmailStep'
import SignUpNameStep from '../SignUpNameStep/SignUpNameStep'

import { useAppSelector } from '../../hooks/redux'

const Container = styled.View`
  flex: 1; 
  width: 100%;
  justify-content: space-between;
`

const Instruction = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const signUpSteps = [
  {
    instruction: 'Primeiramente, insira seu e-mail',
    form: <SignUpEmailStep />
  },
  {
    instruction: 'Perfeito, agora insira seu nome e sobrenome',
    form: <SignUpNameStep />
  },
  {
    instruction: 'Insira agora o seu CPF',
    form: <></>
  }
] as const

const SignUpStep: React.FC = () => {
  const { step } = useAppSelector(({ signUp }) => signUp)
  const { instruction, form } = signUpSteps[step]

  return (
    <Container>
      <Instruction>
        { instruction }
      </Instruction>
      <View>
        { form }
      </View>
    </Container>
  )
}

export default SignUpStep