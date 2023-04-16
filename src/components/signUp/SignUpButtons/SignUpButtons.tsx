import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import TextButton from '@Components/atomic/TextButton'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { previousStep } from '@Store/reducers/signUp'

import { ISignUpButtons } from './interface'

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
`

const IndividualButtonContainer = styled.View`
  flex: 1;
`

const SignUpButtons: React.FC<ISignUpButtons> = ({ handleOnPressNextButton }) => {
  const { step } = useAppSelector(({ signUp }) => signUp)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  function handleOnPressBackButton() {
    if(step === 0)
      return navigation.goBack()

    dispatch(previousStep())
  }

  return (
    <ButtonsContainer>
      <IndividualButtonContainer>
        <TextButton
          text='Voltar'
          variant='secondary'
          onPress={handleOnPressBackButton}
        />
      </IndividualButtonContainer>
      <IndividualButtonContainer>
        <TextButton
          text="Avançar"
          variant='primary'
          onPress={handleOnPressNextButton}
        />
      </IndividualButtonContainer>
    </ButtonsContainer>
  )
}

export default SignUpButtons