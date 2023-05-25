import React, { Fragment, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { css } from 'styled-components/native'

import TextButton from '@Components/atomic/TextButton/TextButton'
import TextField from '@Components/atomic/TextField/TextField'
import { useAppSelector } from '@Hooks/redux'
import { View } from 'react-native'
import UserService from '@Api/services/userService'
import Toast from 'react-native-root-toast'

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

const MaximumMetersField = styled(TextField)`
  width: 30px;
`

const LocationButtonSelect = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 2px 10px;
  border-radius: 20px;
  margin-bottom: 4px;
  background-color: ${({ theme }) => theme.colors['primary'].main}33;
  border: 4px solid
    ${({ selected, theme }) =>
      selected ? theme.colors['primary'].main : `${theme.colors['primary'].main}33`};
`

const LocationTextSelect = styled.Text`
  font-family: 'Poppins-SemiBold';
`

const NestedSelectContainer = styled.View`
  padding-left: 24px;
`

const Preferences = () => {
  const {
    addressData: { data: statesData },
    auth: { token },
  } = useAppSelector((state) => state)
  const [animals, setAnimals] = useState<boolean | null>(null)
  const [maximumMetersBuilt, setMaximumMetersBuilt] = useState(50)
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([])

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

  function handleOnPressSelectState(stateId: string) {
    if (selectedStates.includes(stateId)) {
      setSelectedStates((prevState) => prevState.filter((id) => id !== stateId))
    } else {
      setSelectedStates((prevState) => [...prevState, stateId])
    }
  }

  function handleOnPressSelectCity(cityId: string) {
    if (selectedCities.includes(cityId)) {
      setSelectedCities((prevState) => prevState.filter((id) => id !== cityId))
    } else {
      setSelectedCities((prevState) => [...prevState, cityId])
    }
  }

  function handleOnPressSelectNeighborhood(neighborhoodId: string) {
    if (selectedNeighborhoods.includes(neighborhoodId)) {
      setSelectedNeighborhoods((prevState) =>
        prevState.filter((id) => id !== neighborhoodId)
      )
    } else {
      setSelectedNeighborhoods((prevState) => [...prevState, neighborhoodId])
    }
  }

  async function handleOnPressSavePreferences() {
    const preferencesResponse = await UserService.savePreferences(
      {
        animals,
        maximumMetersBuilt,
        neighborhoods: selectedNeighborhoods,
      },
      token?.value ?? ''
    )

    console.log({ preferencesResponse })

    if (preferencesResponse.status !== 'error') {
      Toast.show('Preferências salvas com sucesso.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
      })
    }
  }

  const isFormFulfilled =
    animals !== null && maximumMetersBuilt > 0 && selectedNeighborhoods.length > 0

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <MaximumMetersField
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
          <View>
            {statesData?.map(({ id: stateId, name: stateName, cities }) => (
              <Fragment key={stateId}>
                <LocationButtonSelect
                  onPress={() => handleOnPressSelectState(stateId)}
                  selected={selectedStates.includes(stateId)}
                >
                  <LocationTextSelect>{stateName}</LocationTextSelect>
                </LocationButtonSelect>
                {selectedStates.includes(stateId) && (
                  <NestedSelectContainer>
                    {cities.map(({ id: cityId, name: cityName, neighborhoods }) => (
                      <Fragment key={cityId}>
                        <LocationButtonSelect
                          onPress={() => handleOnPressSelectCity(cityId)}
                          selected={selectedCities.includes(cityId)}
                        >
                          <LocationTextSelect>{cityName}</LocationTextSelect>
                        </LocationButtonSelect>
                        {selectedCities.includes(cityId) && (
                          <NestedSelectContainer>
                            {neighborhoods.map(
                              ({ id: neighborhoodId, name: neighborhoodName }) => (
                                <LocationButtonSelect
                                  key={neighborhoodId}
                                  onPress={() =>
                                    handleOnPressSelectNeighborhood(neighborhoodId)
                                  }
                                  selected={selectedNeighborhoods.includes(
                                    neighborhoodId
                                  )}
                                >
                                  <LocationTextSelect>
                                    {neighborhoodName}
                                  </LocationTextSelect>
                                </LocationButtonSelect>
                              )
                            )}
                          </NestedSelectContainer>
                        )}
                      </Fragment>
                    ))}
                  </NestedSelectContainer>
                )}
              </Fragment>
            ))}
          </View>
        </PreferenceGroup>
        <TextButton
          text={'Salvar Preferências'}
          variant="primary"
          onPress={handleOnPressSavePreferences}
          disabled={!isFormFulfilled}
        />
      </Container>
    </SafeAreaView>
  )
}

export default Preferences
