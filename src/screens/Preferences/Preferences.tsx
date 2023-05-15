import TextButton from '@Components/atomic/TextButton/TextButton'
import TextField from '@Components/atomic/TextField/TextField'
import React, { useState } from 'react'
import styled from 'styled-components/native'

const Container = styled.ScrollView`
  flex: 1;
  padding: 24px 16px;
`

const Title = styled.Text`
  font-family: 'Poppins-SemiBold';
  text-align: center;
  font-size: 24px;
  margin-bottom: 16px;
`

const PreferenceGroup = styled.View`
  background-color: #ececec;
  padding: 16px;
  border-radius: 16px;
  border: 2px solid #ccc;
  margin-bottom: 16px;
`

const PreferenceTitle = styled.Text`
  font-family: 'Poppins-Medium';
  font-size: 18px;
`

const ButtonsInlineContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`

const Preferences = () => {
  const [animals, setAnimals] = useState<boolean | null>(null)
  const [maximumMetersBuilt, setMaximumMetersBuilt] = useState(50)

  function handleOnPressDecreaseMeters() {
    setMaximumMetersBuilt((prevValue) => prevValue - 5)
  }

  function handleOnPressIncreaseMeters() {
    setMaximumMetersBuilt((prevValue) => prevValue + 5)
  }

  function handleOnChangeMeters(value: string) {
    const numericValue = Number(value.replace(/[^\d]/g, ''))

    if (isNaN(numericValue)) return

    setMaximumMetersBuilt(numericValue)
  }

  function handleOnPressSavePreferences() {}

  return (
    <Container>
      <Title>Selecione suas preferências</Title>
      <PreferenceGroup>
        <PreferenceTitle>Residência com animais</PreferenceTitle>
        <ButtonsInlineContainer>
          <TextButton
            text={'Sim'}
            variant="primary"
            ghost={animals === null || animals === false}
            fluid
            onPress={() => setAnimals(true)}
          />
          <TextButton
            text={'Não'}
            variant="primary"
            ghost={animals === null || animals === true}
            fluid
            onPress={() => setAnimals(false)}
          />
        </ButtonsInlineContainer>
      </PreferenceGroup>
      <PreferenceGroup>
        <PreferenceTitle>Tamanho máximo da residência (m²)</PreferenceTitle>
        <ButtonsInlineContainer>
          <TextButton
            text={'-'}
            variant="primary"
            disabled={maximumMetersBuilt <= 0}
            fluid
            onPress={handleOnPressDecreaseMeters}
          />
          <TextField
            variant="primary"
            value={String(maximumMetersBuilt)}
            fluid
            onChangeText={handleOnChangeMeters}
            keyboardType="number-pad"
          />
          <TextButton
            text={'+'}
            variant="primary"
            fluid
            onPress={handleOnPressIncreaseMeters}
          />
        </ButtonsInlineContainer>
      </PreferenceGroup>
      <PreferenceGroup>
        <PreferenceTitle>Localidades</PreferenceTitle>
      </PreferenceGroup>
      <TextButton
        text={'Salvar Preferências'}
        variant="primary"
        onPress={handleOnPressSavePreferences}
      />
    </Container>
  )
}

export default Preferences
