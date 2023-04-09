import React, { useState } from 'react'
import { View } from 'react-native'

import EmailTextField from '@Components/atomic/EmailTextField'
import TextButton from '@Components/atomic/TextButton'
import SignUpErrors from '@Components/signUp/SignUpErrors'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

import { validateEmail } from '@Utils/validation'

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