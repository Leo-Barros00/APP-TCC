import SearchBar from '@Components/atomic/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '@Hooks/redux'
import HouseService from '@Api/services/houseService'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { Keyboard, KeyboardAvoidingView, TextInput, View } from 'react-native'
import ProvidersList from './components/ProvidersList'

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`

const AddButton = styled.TouchableOpacity`
  min-height: 20px;
  padding: 8px 8px;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  flex-direction: row;
`

const AddText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';

  padding: 8px 8px;
  color: ${({ theme }) => theme.colors['primary']['main']};
`

const SearchServices: React.FC = () => {
  const { token } = useAppSelector(({ auth }) => auth)
  const theme = useTheme()
  const navigation = useNavigation()
  const [houses, setHouses] = useState<boolean | null>(null)
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  async function handleOnPressSearchText() {
    const getHousesByUser = await HouseService.getHouses(token!.value)
    if (getHousesByUser.length > 0) {
      setHouses(false)
    } else {
      setHouses(true)
    }
  }

  function handleOnPressAddHouse() {
    navigation.navigate('AddHouse')
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true)
    )
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false)
    )

    // Clean up the event listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <SearchBar
          placeholder={'Procure por serviços'}
          onPress={handleOnPressSearchText}
        />
        <ProvidersList />
        {isKeyboardVisible && houses && (
          <AddButton onPress={handleOnPressAddHouse}>
            <>
              <MaterialIcons
                name={'add-box'}
                size={20}
                color={theme.colors['primary']['main']}
              />
              <AddText>{'Adicione sua residencia aqui'}</AddText>
            </>
          </AddButton>
        )}
      </Container>
    </SafeAreaView>
  )
}

export default SearchServices
