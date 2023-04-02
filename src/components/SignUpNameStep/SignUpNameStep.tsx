import React, { useState } from 'react'
import { View } from 'react-native'

import TextField from '../TextField'
import TextButton from '../TextButton'
import SignUpErrors from '../SignUpErrors'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { insertSignUpInfo, nextStep } from '../../store/reducers/signUp'

import { validateRequired } from '../../utils/validation'

const SignUpNameStep = () => {
  const { name, surname } = useAppSelector(({ signUp }) => signUp)
  const [nameErrors, setNameErrors] = useState<string[]>([])
  const [surnameErrors, setSurnameErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangeNameField(value: string) {
    dispatch(insertSignUpInfo({ name: value }))
    setNameErrors([])
  }

  function handleOnChangeSurnameField(value: string) {
    dispatch(insertSignUpInfo({ surname: value }))
    setSurnameErrors([])
  }

  function handleOnClickNext() {
    const nameValidation = validateRequired('Nome', name)
    const surnameValidation = validateRequired('Sobrenome', surname)

    if(!nameValidation.success || !surnameValidation.success) {
      setNameErrors(nameValidation.errors)
      setSurnameErrors(surnameValidation.errors)

      return;
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={[...nameErrors, ...surnameErrors]} />
      <TextField
        variant='primary'
        fluid
        onChangeText={handleOnChangeNameField}
        value={name}
        placeholder="Nome"
        blurOnSubmit={false}
        returnKeyType="next"
      />
      <TextField
        variant='primary'
        fluid
        onChangeText={handleOnChangeSurnameField}
        value={surname}
        placeholder="Sobrenome"
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

export default SignUpNameStep