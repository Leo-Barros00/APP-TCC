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
    signUp: { cityId, neighborhoodId },
  } = useAppSelector((state) => state)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

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

  const mappedCityDataSelect = data?.map(({ id, name }) => ({ id, value: name }))
  const selectedCity = mappedCityDataSelect?.find(({ id }) => id === cityId)

  const mappedNeighborhoodDataSelect = data
    ?.find(({ id }) => id === selectedCity?.id)
    ?.neighborhoods.map(({ id, name }) => ({ id, value: name }))
  const selectedNeighborhood = mappedNeighborhoodDataSelect?.find(
    ({ id }) => id === neighborhoodId
  )

  return (
    <View>
      <SignUpErrors errors={errors} />
      <Select
        title={'Selecione sua cidade'}
        selectedOption={selectedCity}
        options={mappedCityDataSelect}
        onSelect={handleOnSelectCity}
      />
      {cityId && (
        <Select
          title={'Selecione seu bairro'}
          selectedOption={selectedNeighborhood}
          options={mappedNeighborhoodDataSelect}
          onSelect={handleOnSelectNeighborhood}
        />
      )}
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpAddressFirstStep
