import React, { useState } from 'react'
import { View } from 'react-native'

import Select from '@Components/atomic/Select/Select'
import SignUpButtons from '@Components/signUp/SignUpButtons'
import SignUpErrors from '@Components/signUp/SignUpErrors'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

const SignUpAddressFirstStep = () => {
  const {
    addressData: { data },
    signUp: { stateId, cityId, neighborhoodId },
  } = useAppSelector((state) => state)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnSelectState(stateId: string) {
    dispatch(insertSignUpInfo({ stateId, cityId: '', neighborhoodId: '' }))
  }

  function handleOnSelectCity(cityId: string) {
    dispatch(insertSignUpInfo({ cityId, neighborhoodId: '' }))
  }

  function handleOnSelectNeighborhood(neighborhoodId: string) {
    dispatch(insertSignUpInfo({ neighborhoodId }))
    setErrors([])
  }

  function handleOnPressNextButton() {
    if (!cityId || !neighborhoodId) {
      setErrors(['Deve-se selecionar o bairro e a cidade'])
      return
    }

    dispatch(nextStep())
  }

  const mappedStateDataSelect = data?.map(({ id, name }) => ({ id, value: name }))
  const selectedState = data?.find(({ id }) => id === stateId)

  const mappedCityDataSelect = selectedState?.cities.map(({ id, name }) => ({
    id,
    value: name,
  }))
  const selectedCity = selectedState?.cities.find(({ id }) => id === cityId)

  const mappedNeighborhoodDataSelect = selectedCity?.neighborhoods.map(
    ({ id, name }) => ({ id, value: name })
  )
  const selectedNeighborhood = selectedCity?.neighborhoods.find(
    ({ id }) => id === neighborhoodId
  )

  return (
    <View>
      <SignUpErrors errors={errors} />
      <Select
        title={'Selecione seu estado'}
        selectedOption={selectedState?.id}
        options={mappedStateDataSelect}
        onSelect={handleOnSelectState}
      />
      {stateId && (
        <Select
          title={'Selecione sua cidade'}
          selectedOption={selectedCity?.id}
          options={mappedCityDataSelect}
          onSelect={handleOnSelectCity}
        />
      )}
      {cityId && (
        <Select
          title={'Selecione seu bairro'}
          selectedOption={selectedNeighborhood?.id}
          options={mappedNeighborhoodDataSelect}
          onSelect={handleOnSelectNeighborhood}
        />
      )}
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpAddressFirstStep
