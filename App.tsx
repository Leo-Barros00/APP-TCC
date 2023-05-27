import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components/native'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux'
import { RootSiblingParent } from 'react-native-root-siblings'

import RootNavigation from './src/RootNavigation'

import { basicTheme, lightTheme } from './src/theme'
import store from '@Store/configureStore'
import { fetchAddressData } from '@Store/reducers/addressData'
import { useAppDispatch } from '@Hooks/redux'
import {
  deleteSecureStoreValue,
  getSecureStoreValue,
  secureStoreSave,
} from '@Utils/secureStore'
import UserService from '@Api/services/userService'
import { insertAuthInfo } from '@Store/reducers/auth'

SplashScreen.preventAutoHideAsync()

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...basicTheme, ...lightTheme }}>
        <RootSiblingParent>
          <RootApp />
        </RootSiblingParent>
      </ThemeProvider>
    </Provider>
  )
}

function RootApp() {
  const [appIsReady, setAppIsReady] = useState(false)
  const dispatch = useAppDispatch()

  async function loadFonts() {
    await Font.loadAsync({
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    })
  }

  async function loadAddressData() {
    await dispatch(fetchAddressData()).unwrap()
  }

  async function verifyLogin() {
    const storedTokens = await getSecureStoreValue('secureToken')

    if (storedTokens === null) return

    const parsedTokens = JSON.parse(storedTokens)

    const refreshResponse = await UserService.refreshToken(
      parsedTokens.token.value,
      parsedTokens.refreshToken.value
    )

    if (refreshResponse.status === 'error') return deleteSecureStoreValue('secureToken')

    const newTokenObject = {
      ...parsedTokens,
      ...refreshResponse,
    }

    dispatch(insertAuthInfo({ ...newTokenObject, isLogged: true }))
    secureStoreSave('secureToken', JSON.stringify(newTokenObject))
  }

  useEffect(() => {
    async function prepare() {
      await Promise.all([loadFonts(), loadAddressData(), verifyLogin()])

      setAppIsReady(true)
    }

    prepare()
  }, [])

  useEffect(() => {
    if (appIsReady) setTimeout(SplashScreen.hideAsync, 1000)
  }, [appIsReady])

  if (!appIsReady) return null

  return <RootNavigation />
}
