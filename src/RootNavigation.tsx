import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from './screens/Onboarding';

const Stack = createNativeStackNavigator()

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <UnauthenticatedNavigation />
    </NavigationContainer>
  )
}

const UnauthenticatedNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  )
}

const AuthenticatedNavigation = () => {
  return (
    <></>
  )
}

export default RootNavigation