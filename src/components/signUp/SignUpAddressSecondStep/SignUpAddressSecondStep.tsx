import React, { useState } from 'react'
import { View } from 'react-native'

import SignUpButtons from '@Components/signUp/SignUpButtons'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import TextField from '@Components/atomic/TextField'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

const SignUpAddressSecondStep = () => {
  const { addressDescription, addressNumber } = useAppSelector(({ signUp }) => signUp)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangeAddresField(value: string) {
    dispatch(insertSignUpInfo({ addressDescription: value }))
    setErrors([])
  }

  function handleOnChangeNumberField(value: string) {
    dispatch(insertSignUpInfo({ addressNumber: value }))
    setErrors([])
  }

  function handleOnPressNextButton() {
    if (!addressDescription || !addressNumber) {
      setErrors(['Todas as informações são obrigatórias'])
      return
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={errors} />
      <TextField
        placeholder="Endereço"
        fluid
        variant="primary"
        onChangeText={handleOnChangeAddresField}
        value={addressDescription}
      />
      <TextField
        placeholder="Número"
        fluid
        variant="primary"
        onChangeText={handleOnChangeNumberField}
        value={addressNumber}
      />
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpAddressSecondStep
