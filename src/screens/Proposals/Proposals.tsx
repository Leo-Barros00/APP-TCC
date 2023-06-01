import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'

const ProposalsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MessageWarning
        title={'Você ainda não selecionou suas preferências!'}
        text={'Selecione suas preferências para começar a receber propostas.'}
        buttonText={'Selecionar Preferências'}
        navigateTo={'Preferences'}
      />
    </SafeAreaView>
  )
}

export default ProposalsScreen
