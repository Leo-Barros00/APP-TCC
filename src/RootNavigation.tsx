import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from './screens/Onboarding';
import SignUp from './screens/SignUp';

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
    <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}

const AuthenticatedNavigation = () => {
  return (
    <></>
  )
}

export default RootNavigation