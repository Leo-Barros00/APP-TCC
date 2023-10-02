import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
`

const Approval = () => {
  return (
    <SafeAreaContainer>
      <MessageWarning
        title={'Perfil ainda não aprovado.'}
        text={
          'O seu perfil ainda não foi aprovado. Mas não se preocupe, o processo é rápido e retornaremos assim que possível.'
        }
      />
    </SafeAreaContainer>
  )
}

export default Approval
