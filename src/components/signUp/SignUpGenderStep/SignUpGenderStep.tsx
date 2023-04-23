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
  const [ femaleSelected, setFemaleSelected ] = useState<boolean>(false);
  const [ maleSelected, setMaleSelected ] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  function handleOnClickGenderSelected(value: string) {
    dispatch(insertSignUpInfo({ gender: value }))
    setGenderErrors([])
  }

  function handleOnPressNextButton() {
    const genderValidation = validateRequired('Genero', gender)

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
          selected={maleSelected}
          text={'Masculino'}
          onPress={() => {
            setMaleSelected(!maleSelected);
            setFemaleSelected(false);
            handleOnClickGenderSelected('Masculino')
          }}
          variant={'secondary'}
          fluid
        />
        <SelectedCard
          selected={femaleSelected}
          text={'Feminino'}
          onPress={() => {
            setFemaleSelected(!femaleSelected);
            setMaleSelected(false)
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
