import React, { useState } from 'react'

import styled from 'styled-components/native'

import TextButton from '@Components/atomic/TextButton'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'
import SelectImage from '@Components/atomic/SelectImage'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Title = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';
`

const SelectImageContainer = styled.View<{ selected: boolean }>`
  border-radius: 8px;
  border: 4px solid
    ${({ theme, selected }) =>
      selected ? theme.colors.success.main : theme.colors.primary.main};
  padding: 8px;
`

const SignUpPhotoStep = () => {
  const { documentImage, personImage } = useAppSelector(({ signUp }) => signUp)
  const dispatch = useAppDispatch()

  const [errors, setErrors] = useState<string[]>([])

  function handleOnChangeDocumentImage(value: string) {
    dispatch(insertSignUpInfo({ documentImage: value }))
    setErrors([])
  }

  function handleOnChangePersonImage(value: string) {
    dispatch(insertSignUpInfo({ personImage: value }))
    setErrors([])
  }

  async function handleOnPressNextButton() {
    if (!documentImage || !personImage)
      return setErrors(['É necessário enviar as duas imagens para concluir o cadastro'])

    dispatch(nextStep())
  }

  return (
    <>
      <SignUpErrors errors={errors} />
      <Container>
        <SelectImageContainer selected={!!documentImage}>
          <Title>Foto do seu documento</Title>
          {!!documentImage ? (
            <TextButton
              variant="success"
              text="Remover imagem"
              onPress={() => handleOnChangeDocumentImage('')}
            />
          ) : (
            <SelectImage callback={handleOnChangeDocumentImage} />
          )}
        </SelectImageContainer>
        <SelectImageContainer selected={!!personImage}>
          <Title>Foto sua segurando seu documento</Title>
          {!!personImage ? (
            <TextButton
              variant="success"
              text="Remover imagem"
              onPress={() => handleOnChangePersonImage('')}
            />
          ) : (
            <SelectImage callback={handleOnChangePersonImage} />
          )}
        </SelectImageContainer>
      </Container>
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </>
  )
}

export default SignUpPhotoStep
