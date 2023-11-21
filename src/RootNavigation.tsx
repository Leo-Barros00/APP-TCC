import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'

import NavBar from '@Components/atomic/NavBar'
import AddHouse from '@Screens/AddHouse'
import Home from '@Screens/Home'
import Onboarding from '@Screens/Onboarding'
import Preferences from '@Screens/Preferences'
import Profile from '@Screens/Profile'
import HousesList from '@Screens/Profile/HousesList'
import ProposalsScreen from '@Screens/Proposals'
import HiringList from '@Screens/HiringList'
import Rating from '@Screens/Rating'
import Report from '@Screens/Report'
import Balance from '@Screens/Balance'
import Withdraw from '@Screens/Withdraw'
import SearchServices from '@Screens/SearchServices'
import SendContract from '@Screens/SendContract'
import Approval from '@Screens/Approval'
import SignIn from '@Screens/SignIn'
import SignUp from '@Screens/SignUp'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertAuthInfo } from '@Store/reducers/auth'
import { insertLoggedUserInfo } from '@Store/reducers/user'

import UserService from '@Api/services/userService'

import { secureStoreSave } from '@Utils/secureStore'

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
  const dispatch = useAppDispatch()
  const { auth, user } = useAppSelector((state) => state)
  const { token, refreshToken } = auth
  const { status } = user

  const isApprovedUser = status === 'approved'

  async function loadLoggedUser() {
    const TEN_MINUTES_IN_MS = 600000

    const response = await UserService.getLoggedUser()
    dispatch(insertLoggedUserInfo(response))

    setInterval(async () => {
      if (!token || !refreshToken) return

      const refreshResponse = await UserService.refreshToken(
        token.value,
        refreshToken.value
      )

      const newTokenObject = {
        token,
        refreshToken,
        ...refreshResponse,
      }

      dispatch(insertAuthInfo({ ...newTokenObject, isLogged: true }))
      secureStoreSave('secureToken', JSON.stringify(newTokenObject))
    }, TEN_MINUTES_IN_MS)
  }

  useEffect(() => {
    loadLoggedUser()
  }, [])

  return (
    <Stack.Navigator
      initialRouteName={isApprovedUser ? 'Main' : 'Approval'}
      screenOptions={{ headerShown: false }}
    >
      {isApprovedUser ? (
        <>
          <Stack.Screen name="Main" component={MainNavigation} />
          <Stack.Screen name="AddHouse" component={AddHouse} />
          <Stack.Screen name="Preferences" component={Preferences} />
          <Stack.Screen name="HouseList" component={HousesList} />
          <Stack.Screen name="SendContract" component={SendContract} />
          <Stack.Screen name="HiringList" component={HiringList} />
          <Stack.Screen name="Rating" component={Rating} />
          <Stack.Screen name="Report" component={Report} />
          <Stack.Screen name="Balance" component={Balance} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
        </>
      ) : (
        <Stack.Screen name="Approval" component={Approval} />
      )}
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
