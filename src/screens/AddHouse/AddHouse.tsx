import Select from '@Components/atomic/Select'
import TextField from '@Components/atomic/TextField/TextField'
import SignUpButtons from '@Components/signUp/SignUpButtons/SignUpButtons'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import { useAppSelector } from '@Hooks/redux'
import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
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
const houseInitialValues: IHouse = {
  cityId: '',
  neighborhoodId: '',
  addressDescription: '',
  addressNumber: '',
}

const AddHouse: React.FC = () => {
  const {
    addressData: { data },
  } = useAppSelector((state) => state)
  const [errors, setErrors] = useState<string[]>([])
  const [house, setHouse] = useState(houseInitialValues)

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

  function handleOnPressNextButton() {
    if (
      !house.cityId ||
      !house.neighborhoodId ||
      !house.addressDescription ||
      !house.addressNumber
    ) {
      setErrors(['Deve-se selecionar o bairro e a cidade'])
      return
    }
  }

  const mappedCityDataSelect = data?.map(({ id, name }) => ({ id, value: name }))
  const selectedCity = mappedCityDataSelect?.find(({ id }) => id === house.cityId)
  console.log(selectedCity)
  const mappedNeighborhoodDataSelect = data
    ?.find(({ id }) => id === selectedCity?.id)
    ?.neighborhoods.map(({ id, name }) => ({ id, value: name }))
  const selectedNeighborhood = mappedNeighborhoodDataSelect?.find(
    ({ id }) => id === house.neighborhoodId
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollContainer>
        <Container>
          <Instruction>
            {'Precisamos saber o endereço da residência que deseja contratar um serviço'}
          </Instruction>
          <View>
            <SignUpErrors errors={errors} />

            <Select
              title={'Selecione sua cidade'}
              selectedOption={selectedCity}
              options={mappedCityDataSelect}
              onSelect={handleOnSelectCity}
            />
            {house.cityId && (
              <Select
                title={'Selecione seu bairro'}
                selectedOption={selectedNeighborhood}
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
            <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
          </View>
        </Container>
      </ScrollContainer>
    </SafeAreaView>
  )
}

export default AddHouse
