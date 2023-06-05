import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import NavBar from '@Components/atomic/NavBar/NavBar'
import Onboarding from '@Screens/Onboarding'
import SignUp from '@Screens/SignUp'
import Home from '@Screens/Home/Home'
import Profile from '@Screens/Profile/Profile'
import SignIn from '@Screens/SignIn/SignIn'
import SearchServices from '@Screens/SearchServices/SearchServices'
import AddHouse from '@Screens/AddHouse/AddHouse'
import HousesList from '@Screens/Profile/HousesList/HousesList'
import ProposalsScreen from '@Screens/Proposals'
import { useAppSelector } from '@Hooks/redux'
import Preferences from '@Screens/Preferences/Preferences'
import SendContract from '@Screens/SendContract/SendContract'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const RootNavigation = () => {
  const { isLogged } = useAppSelector(({ auth }) => auth)

  return (
    <NavigationContainer>
      {isLogged ? <AuthenticatedNavigation /> : <UnauthenticatedNavigation />}
    </NavigationContainer>
  )
}

const UnauthenticatedNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  )
}

const AuthenticatedNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigation} />
      <Stack.Screen name="AddHouse" component={AddHouse} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="HouseList" component={HousesList} />
      <Stack.Screen name="SendContract" component={SendContract} />
    </Stack.Navigator>
  )
}

const MainNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={NavBar}
    >
      <Tab.Screen name="Proposals" component={ProposalsScreen} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SearchServices" component={SearchServices} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default RootNavigation
