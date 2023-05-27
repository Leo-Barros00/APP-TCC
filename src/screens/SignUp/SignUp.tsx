import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import SignUpStep from '@Components/signUp/SignUpStep'

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

const SignUp: React.FC = () => {
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
