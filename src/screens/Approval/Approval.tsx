import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'
import TextButton from '@Components/atomic/TextButton'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { deleteSecureStoreValue } from '@Utils/secureStore'
import { reset as resetAuth } from '@Store/reducers/auth'
import { reset as resetServices } from '@Store/reducers/services'
import { reset as resetSignUp } from '@Store/reducers/signUp'
import { reset as resetUser } from '@Store/reducers/user'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`

const Approval = () => {
  const dispatch = useAppDispatch()
  const { status, rejectReasons } = useAppSelector(({ user }) => user)

  const isRejectedUser = status === 'rejected'

  function resetRedux() {
    dispatch(resetAuth())
    dispatch(resetSignUp())
    dispatch(resetUser())
    dispatch(resetServices())
  }

  function handleOnPressLogoutButton() {
    deleteSecureStoreValue('secureToken')
    resetRedux()
  }

  function handleOnPressReSignButton() {
    deleteSecureStoreValue('secureToken')
    resetRedux()
  }

  if (status === 'pending') {
    return (
      <SafeAreaContainer>
        <MessageWarning
          title={'Perfil ainda não aprovado.'}
          text={
            'O seu perfil ainda não foi aprovado. Mas não se preocupe, o processo é rápido e retornaremos assim que possível.'
          }
        />
        <TextButton variant="primary" text="Sair" onPress={handleOnPressLogoutButton} />
      </SafeAreaContainer>
    )
  }

  return (
    <SafeAreaContainer>
      <MessageWarning
        title={'Perfil não aprovado.'}
        text={`O seu perfil não foi aprovado pelo motivo de: ${rejectReasons[0].reason}`}
      />
      <TextButton
        variant="primary"
        text="Recadastrar"
        onPress={handleOnPressReSignButton}
      />
    </SafeAreaContainer>
  )
}

export default Approval
