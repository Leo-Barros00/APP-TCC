import React, { useState } from 'react'
import { View } from 'react-native'

import SignUpErrors from '@Components/signUp/SignUpErrors'
import TextButton from '@Components/atomic/TextButton'
import RadioButton from '@Components/atomic/RadioButton/RadioButton'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { nextStep } from '@Store/reducers/signUp'

const SignUpGenderStep = () => {
  const [errors, setErrors] = useState<string[]>([])
  const [genderSelected, setGenderSelected] = useState(null)

  const dispatch = useAppDispatch()

  function handleOnClickNext() {
    if(!genderSelected) {
      setErrors(['Algum gênero deve ser selecionado'])
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={errors} />
      <RadioButton 
        title={'Masculino'}
        onPress={() => { console.log('clicou M') } }
        value={'M'}
        variant={'primary'}
        fluid 
      />
      <RadioButton
        title={'Feminino'}
        onPress={() => {console.log('clicou F')}}
        value={'F'}
        variant={'primary'}
        fluid
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

export default SignUpGenderStep