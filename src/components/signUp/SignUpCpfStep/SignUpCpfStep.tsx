import React, { useState } from 'react'
import { View } from 'react-native'

import TextField from '@Components/atomic/TextField'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

import { validateCpf } from '@Utils/validation'

const SignUpCpfStep = () => {
  const { cpf } = useAppSelector(({ signUp }) => signUp)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangeCpfField(value: string) {
    dispatch(insertSignUpInfo({ cpf: value }))
    setErrors([])
  }

  function handleOnPressNextButton() {
    const cpfValidation = validateCpf(cpf)

    if(!cpfValidation.success) {
      return setErrors(cpfValidation.errors)
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={errors} />
      <TextField
        variant='primary'
        fluid
        onChangeText={handleOnChangeCpfField}
        value={cpf}
        placeholder="CPF"
        blurOnSubmit={false}
        returnKeyType="next"
        onSubmitEditing={handleOnPressNextButton}
      />
      <SignUpButtons
        handleOnPressNextButton={handleOnPressNextButton}
      />
    </View>
  )
}

export default SignUpCpfStep