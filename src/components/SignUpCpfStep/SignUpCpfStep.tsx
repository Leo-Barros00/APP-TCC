import React, { useState } from 'react'
import { View } from 'react-native'

import TextField from '../TextField'
import TextButton from '../TextButton'
import SignUpErrors from '../SignUpErrors'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { insertSignUpInfo, nextStep } from '../../store/reducers/signUp'

import { validateCpf } from '../../utils/validation'

const SignUpCpfStep = () => {
  const { cpf } = useAppSelector(({ signUp }) => signUp)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangeCpfField(value: string) {
    dispatch(insertSignUpInfo({ cpf: value }))
    setErrors([])
  }

  function handleOnClickNext() {
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
        onSubmitEditing={handleOnClickNext}
      />
      <TextButton
        text="Avançar"
        variant='primary'
        fluid
        onPress={handleOnClickNext}
      />
    </View>
  )
}

export default SignUpCpfStep