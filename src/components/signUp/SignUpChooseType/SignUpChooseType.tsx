import React, { useState } from 'react'
import { View } from 'react-native'

import TextField from '@Components/atomic/TextField'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

import { validateRequired } from '@Utils/validation'
import SelectedCard from '@Components/atomic/SelectedCard'

const SignUpChooseType = () => {
  const { type } = useAppSelector(({ signUp }) => signUp)
  const [typeErrors, setTypeErrors] = useState<string[]>([])
  const [ contractorSelected, setContractorSelected ] = useState<boolean>(false);
  const [ providerSelected, setProviderSelected ] = useState<boolean>(false);

  const dispatch = useAppDispatch()

  function handleOnClickGenderSelected(value: string) {
    dispatch(insertSignUpInfo({ type: value }))
    setTypeErrors([])
  }

  function handleOnPressNextButton() {
    const typeValidation = validateRequired('Tipo', type)

    if (!typeValidation.success) {
      setTypeErrors(typeValidation.errors)
      return
    }

    dispatch(nextStep())
  }

  return (
    <View>
      <SignUpErrors errors={typeErrors} />
      <View style={{ paddingBottom: 32 }}>
        <SelectedCard
          selected={contractorSelected}
          text={'Contratante'}
          onPress={() => {
            setContractorSelected(!contractorSelected);
            setProviderSelected(false);
            handleOnClickGenderSelected('Contratante')
          }}
          variant={'secondary'}
          fluid
        />
        <SelectedCard
          selected={providerSelected}
          text={'Prestador'}
          onPress={() => {
            setProviderSelected(!providerSelected);
            setContractorSelected(false);
            handleOnClickGenderSelected('Prestador')
          }}
          variant={'secondary'}
          fluid
        />
      </View>
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpChooseType
