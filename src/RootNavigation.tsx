import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import NavBar from '@Components/atomic/NavBar'
import Onboarding from '@Screens/Onboarding'
import SignUp from '@Screens/SignUp'
import Home from '@Screens/Home'
import Profile from '@Screens/Profile'
import SignIn from '@Screens/SignIn'
import SearchServices from '@Screens/SearchServices'
import AddHouse from '@Screens/AddHouse'
import HousesList from '@Screens/Profile/HousesList'
import ProposalsScreen from '@Screens/Proposals'
import Preferences from '@Screens/Preferences'
import SendContract from '@Screens/SendContract'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertLoggedUserInfo } from '@Store/reducers/user'
import { insertAuthInfo } from '@Store/reducers/auth'

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
  const { email, approved } = user

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
