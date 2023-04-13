import React, { useState } from 'react'
import { View } from 'react-native'

import SignUpErrors from '@Components/signUp/SignUpErrors'
import TextButton from '@Components/atomic/TextButton'
import SelectedCard from '@Components/atomic/SelectedCard/SelectedCard'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'
import { validateRequired } from '@Utils/validation'

const SignUpGenderStep = () => {
  const { gender } = useAppSelector(({ signUp }) => signUp)
  const [genderErrors, setGenderErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  function handleOnClickGenderSelected(value: string) {
    dispatch(insertSignUpInfo({ gender: value }))
    setGenderErrors([])
  }

  function handleOnClickNext() {
    const genderValidation = validateRequired('Genero', gender)


    if(!genderValidation.success) {
      setGenderErrors(genderValidation.errors)

      return;
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={genderErrors} />
      <View style={{paddingBottom: 32}}>
        <SelectedCard 
          text={'Masculino'}
          onPress={() => handleOnClickGenderSelected('Masculino')}
          variant={'secondary'}
          fluid 
        />
        <SelectedCard
          text={'Feminino'}
          onPress={() => handleOnClickGenderSelected('Feminino')}
          variant={'secondary'}
          fluid
        />
      </View>
      <TextButton
        text="Avançar"
        variant='primary'
        fluid
        onPress={handleOnClickNext}
      />
    </View>
  )
}

export default SignUpGenderStep