import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native'

import Button from '@Components/atomic/TextButton'

import { useAppDispatch } from '@Hooks/redux'
import { insertSignUpInfo } from '@Store/reducers/signUp'

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 0 16px 16px;
`

const OnboardingTextContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
`

const WelcomeTextTitle = styled.Text`
  font-family: "Poppins-Bold";
  font-size: 40px;
`

const WelcomeTextSubTitle = styled.Text`
  font-family: "Poppins-SemiBold";
  font-size: 30px;
  line-height: 36px;
`

const WelcomeTextHighlight = styled.Text`
  /* text-decoration: underline; */
  color: ${({ theme }) => theme.colors.primary.main};
`

const OnboardingScreen: React.FC<ScreenType> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  function handleOnPressLoginButton() {

  }

  function handleOnPressSignInButton() {
    dispatch(insertSignUpInfo({ step: 0 }))
    navigation.navigate('SignUp')
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <OnboardingTextContainer>
          <WelcomeTextTitle>
            Bem-vindo(a)
          </WelcomeTextTitle>
          <WelcomeTextSubTitle>
            Simplifique a conexão de <WelcomeTextHighlight>quem necessita</WelcomeTextHighlight>, com <WelcomeTextHighlight>quem tem habilidades para realizar</WelcomeTextHighlight>.
          </WelcomeTextSubTitle>
        </OnboardingTextContainer>
        <Button
          fluid
          variant='primary'
          text='Criar conta'
          onPress={handleOnPressSignInButton}
        />
        <Button
          fluid
          variant='secondary'
          text='Fazer login'
          onPress={handleOnPressLoginButton}
        />
      </Container>
    </SafeAreaView>

  )
}

export default OnboardingScreen