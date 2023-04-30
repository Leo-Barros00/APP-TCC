import React from 'react'
import { View, Modal } from 'react-native'
import styled from 'styled-components/native'

import SignUpEmailStep from '@Components/signUp/SignUpEmailStep'
import SignUpNameStep from '@Components/signUp/SignUpNameStep'
import SignUpCpfStep from '@Components/signUp/SignUpCpfStep'
import SignUpBirthDateStep from '@Components/signUp/SignUpBirthDateStep'
import SignUpGenderStep from '@Components/signUp/SignUpGenderStep'
import SignUpPasswordStep from '@Components/signUp/SignUpPasswordStep'
import SignUpAddressFirstStep from '@Components/signUp/SignUpAddressFirstStep'
import SignUpAddressSecondStep from '@Components/signUp/SignUpAddressSecondStep'

import { useAppSelector } from '@Hooks/redux'
import SignUpChooseType from '../SignUpChooseType/SignUpChooseType'

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
    form: <SignUpEmailStep />,
  },
  {
    instruction: 'Perfeito, agora insira seu nome e sobrenome',
    form: <SignUpNameStep />,
  },
  {
    instruction: 'Insira agora o seu CPF',
    form: <SignUpCpfStep />,
  },
  {
    instruction: 'Nos conte agora a sua data de nascimento',
    form: <SignUpBirthDateStep />,
  },
  {
    instruction: 'Qual gênero você se identifica? Escolha uma das opções',
    form: <SignUpGenderStep />,
  },
  {
    instruction: 'Precisamos agora saber o seu endereço',
    form: <SignUpAddressFirstStep />,
  },
  {
    instruction: 'Precisamos agora saber o seu endereço',
    form: <SignUpAddressSecondStep />,
  },
  {
    instruction: 'Você deseja exercer o papel de Contratante ou Prestador de serviços aqui no App? Escolha um, por gentileza',
    form: <SignUpChooseType />,
  },
  {
    instruction: 'Informe agora a sua senha para cadastro',
    form: <SignUpPasswordStep />,
  },

] as const

const SignUpStep: React.FC = () => {
  const { step } = useAppSelector(({ signUp }) => signUp)
  const { instruction, form } = signUpSteps[step]

  return (
    <Container>
      <Instruction>{instruction}</Instruction>
      <View>{form}</View>
    </Container>
  )
}

export default SignUpStep
