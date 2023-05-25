import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import PreferencesWarning from '@Components/atomic/PreferencesWarning/PreferencesWarning'

const ProposalsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PreferencesWarning />
    </SafeAreaView>
  )
}

export default ProposalsScreen
