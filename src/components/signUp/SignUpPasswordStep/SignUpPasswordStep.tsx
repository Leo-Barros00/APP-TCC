import { View } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-root-toast'
import { useNavigation } from '@react-navigation/native'

import PasswordTextField from '@Components/atomic/PasswordTextField'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'
import TransitionScreen from '@Components/atomic/TransitionScreen/TransitionScreen'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo } from '@Store/reducers/signUp'
import { insertAuthInfo } from '@Store/reducers/auth'
import UserService from '@Api/services/userService'
import { secureStoreSave } from '@Utils/secureStore'

const SignUpPasswordStep = () => {
  const signUpState = useAppSelector(({ signUp }) => signUp)
  const { email, password, passwordConfirm } = signUpState
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const navigation = useNavigation()

  const dispatch = useAppDispatch()

  function navigateToHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', params: { screen: 'Home' } }],
    })
  }

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

    setLoading(true)

    const signUpResponse = await UserService.signUp(signUpState)

    if (signUpResponse?.status === 'error') {
      Toast.show(signUpResponse?.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
      })
      return dispatch(insertSignUpInfo({ step: 0 }))
    }

    const loginResponse = await UserService.signIn(email, password)
    secureStoreSave('secureToken', JSON.stringify(loginResponse))
    dispatch(insertAuthInfo({ ...loginResponse, isLogged: true }))
    setFinished(true)
  }

  if (finished) {
    return (
      <TransitionScreen
        message="Cadastro finalizado com sucesso!"
        navigatesTo={navigateToHome}
      />
    )
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
      <SignUpButtons
        handleOnPressNextButton={handleOnPressNextButton}
        nextButtonLoading={loading}
      />
    </View>
  )
}

export default SignUpPasswordStep
