import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import PreferencesWarning from '@Components/atomic/PreferencesWarning/PreferencesWarning'

import Preferences from '@Screens/Preferences/Preferences'

const ProposalsStack = createNativeStackNavigator()

const ProposalsStackScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProposalsStack.Navigator screenOptions={{ headerShown: false }}>
        <ProposalsStack.Screen name="Home" component={Proposals} />
        <ProposalsStack.Screen name="Preferences" component={Preferences} />
      </ProposalsStack.Navigator>
    </SafeAreaView>
  )
}

const Proposals = () => {
  return <PreferencesWarning />
}

export default ProposalsStackScreen
