import { View } from 'react-native'
import React, { useState } from 'react'

import PasswordTextField from '@Components/atomic/PasswordTextField'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, sendUserData } from '@Store/reducers/signUp'

const SignUpPasswordStep = () => {
  const { password, passwordConfirm } = useAppSelector(({ signUp }) => signUp)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnChangePasswordField(value: string) {
    dispatch(insertSignUpInfo({ password: value }))
    setErrors([])
  }

  function handleOnChangePasswordConfirmField(value: string) {
    dispatch(insertSignUpInfo({ passwordConfirm: value }))
    setErrors([])
  }

  async function handleOnPressNextButton() {
    if (password !== passwordConfirm) {
      setErrors(['As senhas devem coincidir'])
      return
    }

    const signUpRequisition = await dispatch(sendUserData())
    console.log(signUpRequisition.payload)
  }

  return (
    <View>
      <SignUpErrors errors={errors} />
      <PasswordTextField
        variant="primary"
        fluid
        onChangeText={handleOnChangePasswordField}
        value={password}
        placeholder="Senha"
        blurOnSubmit={false}
        returnKeyType="next"
        onSubmitEditing={handleOnPressNextButton}
      />
      <PasswordTextField
        variant="primary"
        fluid
        onChangeText={handleOnChangePasswordConfirmField}
        value={passwordConfirm}
        placeholder="Confirme sua senha"
        blurOnSubmit={false}
        returnKeyType="next"
        onSubmitEditing={handleOnPressNextButton}
      />
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpPasswordStep
