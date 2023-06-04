import HouseService from '@Api/services/houseService'
import Select from '@Components/atomic/Select'
import TextButton from '@Components/atomic/TextButton/TextButton'
import TextField from '@Components/atomic/TextField/TextField'
import TransitionScreen from '@Components/atomic/TransitionScreen/TransitionScreen'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { insertHouse } from '@Store/reducers/user'

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  width: 100%;
  justify-content: space-between;
  padding: 16px 16px;
`

const Instruction = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`
const ScrollContainer = styled.ScrollView`
  height: 100%;
`

const ButtonsInlineContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`

const AddressContainer = styled.View`
  margin-top: 56px;
  margin-bottom: 36px;
`

const ButtonsTitle = styled.Text`
  font-family: 'Poppins-Medium';
  font-size: 18px;
`

const houseInitialValues: IHouse = {
  cityId: '',
  neighborhoodId: '',
  addressDescription: '',
  addressNumber: '',
  stateId: '',
  metersBuilt: 50,
  animals: null,
}

const AddHouse: React.FC = () => {
  const {
    addressData: { data },
  } = useAppSelector((state) => state)
  const [errors, setErrors] = useState<string[]>([])
  const [house, setHouse] = useState(houseInitialValues)
  const { token } = useAppSelector(({ auth }) => auth)
  const [finished, setFinished] = useState(false)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  function handleOnPressDecreaseMeters() {
    setHouse({ ...house, metersBuilt: house.metersBuilt - 5 })
  }

  function handleOnPressIncreaseMeters() {
    setHouse({ ...house, metersBuilt: house.metersBuilt + 5 })
  }

  function handleOnChangeMeters(value: string) {
    const numericValue = Number(value.replace(/[^\d]/g, ''))

    if (isNaN(numericValue)) return

    setHouse({ ...house, metersBuilt: numericValue })
  }

  function handleOnSelectCity(cityId: string) {
    setHouse({ ...house, cityId })
    setErrors([])
  }

  function handleOnSelectNeighborhood(neighborhoodId: string) {
    setHouse({ ...house, neighborhoodId })
    setErrors([])
  }

  function handleOnChangeAddresField(addressDescription: string) {
    setHouse({ ...house, addressDescription })
    setErrors([])
  }

  function handleOnChangeNumberField(addressNumber: string) {
    setHouse({ ...house, addressNumber })
    setErrors([])
  }

  function handleOnSelectState(stateId: string) {
    setHouse({ ...house, stateId })
    setErrors([])
  }

  function handleOnSelectAnimals(animals: boolean) {
    setHouse({ ...house, animals })
    setErrors([])
  }

  async function handleOnPressNextButton() {
    if (
      !finished &&
      (!house.cityId ||
        !house.neighborhoodId ||
        !house.addressDescription ||
        !house.addressNumber ||
        !house.stateId ||
        !house.metersBuilt ||
        house.animals === null)
    ) {
      setErrors(['Deve-se selecionar todos os elementos!'])
      return
    }

    const response = await HouseService.setNewHouse(house, token!.value)

    if (response.status === 201) {
      dispatch(insertHouse(response.userHouse))
      setFinished(true)
    }
  }

  function navigateToHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', params: { screen: 'SearchServices' } }],
    })
  }

  const mappedStateDataSelect = data?.map(({ id, name }) => ({ id, value: name }))
  const selectedState = data?.find(({ id }) => id === house.stateId)

  const mappedCityDataSelect = selectedState?.cities.map(({ id, name }) => ({
    id,
    value: name,
  }))
  const selectedCity = selectedState?.cities.find(({ id }) => id === house.cityId)

  const mappedNeighborhoodDataSelect = selectedCity?.neighborhoods.map(
    ({ id, name }) => ({ id, value: name })
  )
  const selectedNeighborhood = selectedCity?.neighborhoods.find(
    ({ id }) => id === house.neighborhoodId
  )

  if (finished) {
    return (
      <TransitionScreen
        message="Cadastro finalizado com sucesso!"
        navigatesTo={navigateToHome}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <Instruction>
            {'Precisamos saber o endereço da residência que deseja contratar um serviço'}
          </Instruction>
          <View>
            <SignUpErrors errors={errors} />
            <ButtonsTitle>A casa tem animais?</ButtonsTitle>
            <ButtonsInlineContainer>
              <TextButton
                text={'Sim'}
                variant="primary"
                ghost={house.animals === null || house.animals === false}
                fluid
                onPress={() => handleOnSelectAnimals(true)}
              />
              <TextButton
                text={'Não'}
                variant="primary"
                ghost={house.animals === null || house.animals === true}
                fluid
                onPress={() => handleOnSelectAnimals(false)}
              />
            </ButtonsInlineContainer>
            <ButtonsTitle>Tamanho da residência (m²)</ButtonsTitle>
            <ButtonsInlineContainer>
              <TextButton
                text={'-'}
                variant="primary"
                disabled={house.metersBuilt <= 0}
                fluid
                onPress={handleOnPressDecreaseMeters}
              />
              <TextField
                variant="primary"
                value={String(house.metersBuilt)}
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
            <AddressContainer>
              <ButtonsTitle>Selecione o endereço da nova residência</ButtonsTitle>
              <Select
                title={'Selecione seu estado'}
                selectedOption={selectedState?.id}
                options={mappedStateDataSelect}
                onSelect={handleOnSelectState}
              />
              {house.stateId && (
                <Select
                  title={'Selecione sua cidade'}
                  selectedOption={selectedCity?.id}
                  options={mappedCityDataSelect}
                  onSelect={handleOnSelectCity}
                />
              )}
              {house.cityId && (
                <Select
                  title={'Selecione seu bairro'}
                  selectedOption={selectedNeighborhood?.id}
                  options={mappedNeighborhoodDataSelect}
                  onSelect={handleOnSelectNeighborhood}
                />
              )}
              <TextField
                placeholder="Endereço"
                fluid
                variant="primary"
                onChangeText={handleOnChangeAddresField}
                value={house.addressDescription}
              />
              <TextField
                placeholder="Número"
                fluid
                variant="primary"
                onChangeText={handleOnChangeNumberField}
                value={house.addressNumber}
              />
            </AddressContainer>
            <TextButton
              text="Cadastrar"
              variant="primary"
              onPress={handleOnPressNextButton}
            />
          </View>
        </Container>
      </ScrollContainer>
    </SafeAreaView>
  )
}

export default AddHouse
