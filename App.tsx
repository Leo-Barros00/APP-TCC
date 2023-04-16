import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components/native'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux'

import RootNavigation from './src/RootNavigation'

import { basicTheme, lightTheme } from './src/theme'
import store from '@Store/configureStore'
import { fetchAddressData } from '@Store/reducers/addressData'
import { useAppDispatch } from '@Hooks/redux'

SplashScreen.preventAutoHideAsync()

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ ...basicTheme, ...lightTheme }}>
        <RootApp />
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

  useEffect(() => {
    async function prepare() {
      await loadFonts()
      await loadAddressData()

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
