import React from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import TextButton from '../TextButton/TextButton'
import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`

const TextContainer = styled.View`
  margin: 32px 0;
`

const WarningTitle = styled.Text`
  font-size: 28px;
  font-family: 'Poppins-Bold';
  text-align: center;
`

const WarningText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-Medium';
  text-align: center;
`

const ButtonContainer = styled.View`
  width: 100%;
`

const PreferencesWarning = () => {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleOnPressPreferencesButton() {
    navigation.navigate('Preferences')
  }

  return (
    <Container>
      <AntDesign name="warning" size={80} color={theme.colors.primary.main} />
      <TextContainer>
        <WarningTitle>Você ainda não selecionou suas preferências!</WarningTitle>
        <WarningText>
          Selecione suas preferências para começar a receber propostas.
        </WarningText>
      </TextContainer>
      <ButtonContainer>
        <TextButton
          onPress={handleOnPressPreferencesButton}
          text="Selecionar Preferências"
          variant="primary"
          fluid
        />
      </ButtonContainer>
    </Container>
  )
}

export default PreferencesWarning
