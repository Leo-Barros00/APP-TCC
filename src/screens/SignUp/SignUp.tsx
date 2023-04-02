import { EventArg } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import SignUpStep from '../../components/SignUpStep'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { previousStep } from '../../store/reducers/signUp'

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`

const TitleContainer = styled.View`
  width: 100%;
  align-items: center;
`

const SignUpTitle = styled.Text`
  font-size: 34px;
  font-family: 'Poppins-Bold';
`

const StepContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`

const SignUp: React.FC<ScreenType> = ({ navigation }) => {
  const { signUp: { step } } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const beforeRemoveCallback: any = (event: EventArg<'beforeRemove', true>) => {
      if (step === 0) return

      event.preventDefault()
      dispatch(previousStep())
    }

    navigation.addListener('beforeRemove', beforeRemoveCallback)

    return () => {
      navigation.removeListener('beforeRemove', beforeRemoveCallback)
    }
  }, [step])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <TitleContainer>
          <SignUpTitle>Criar conta</SignUpTitle>
        </TitleContainer>
        <StepContainer>
          <SignUpStep />
        </StepContainer>
      </Container>
    </SafeAreaView>
  )
}

export default SignUp