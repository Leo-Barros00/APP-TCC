import React, { useState } from 'react'
import { View } from 'react-native'

import EmailTextField from '../../atomic/EmailTextField'
import TextButton from '../../atomic/TextButton'
import SignUpErrors from '../../atomic/SignUpErrors'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { insertSignUpInfo, nextStep } from '../../../store/reducers/signUp'

import { validateEmail } from '../../../utils/validation'

const SignUpEmailStep = () => {
  const { email } = useAppSelector(({ signUp }) => signUp)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangeEmailField(value: string) {
    dispatch(insertSignUpInfo({ email: value }))
    setErrors([])
  }

  function handleOnClickNext() {
    const emailValidation = validateEmail(email)

    if(!emailValidation.success) {
      return setErrors(emailValidation.errors)
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={errors} />
      <EmailTextField
        variant='primary'
        fluid
        onChangeText={handleOnChangeEmailField}
        value={email}
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

export default SignUpEmailStep