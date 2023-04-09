import React, { useState } from 'react'
import { View } from 'react-native'
import { subYears, isSameDay, format } from 'date-fns'

import TextButton from '../../atomic/TextButton'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { nextStep } from '../../../store/reducers/signUp'
import SignUpErrors from '../../atomic/SignUpErrors'
import RadioButton from '../../atomic/RadioButton/RadioButton'

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