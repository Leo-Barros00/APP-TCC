import React, { useState } from 'react'
import { View } from 'react-native'

import SignUpErrors from '@Components/signUp/SignUpErrors'
import SelectedCard from '@Components/atomic/SelectedCard/SelectedCard'
import SignUpButtons from '../SignUpButtons'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'
import { validateRequired } from '@Utils/validation'

const SignUpGenderStep = () => {
  const { gender } = useAppSelector(({ signUp }) => signUp)
  const [genderErrors, setGenderErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnClickGenderSelected(gender: string) {
    dispatch(insertSignUpInfo({ gender }))
    setGenderErrors([])
  }

  function handleOnPressNextButton() {
    const genderValidation = validateRequired('gênero', gender)

    if (!genderValidation.success) {
      setGenderErrors(genderValidation.errors)

      return
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={genderErrors} />
      <View style={{ paddingBottom: 32 }}>
        <SelectedCard
          selected={gender === 'Masculino'}
          text={'Masculino'}
          onPress={() => {
            handleOnClickGenderSelected('Masculino')
          }}
          variant={'secondary'}
          fluid
        />
        <SelectedCard
          selected={gender === 'Feminino'}
          text={'Feminino'}
          onPress={() => {
            handleOnClickGenderSelected('Feminino')
          }}
          variant={'secondary'}
          fluid
        />
      </View>
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpGenderStep
