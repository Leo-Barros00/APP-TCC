import SearchBar from '@Components/atomic/SearchBar/SearchBar'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '@Hooks/redux'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { Keyboard } from 'react-native'
import ProvidersList from './components/ProvidersList'
import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'

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
const PageTitle = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const SearchServices: React.FC = () => {
  const { houses } = useAppSelector(({ user }) => user)
  const theme = useTheme()
  const navigation = useNavigation()
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  const hasHouse = houses.length > 0

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

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {/* <SearchBar placeholder={'Procure por serviços'} onPress={() => {}} /> */}
        <PageTitle>{'Procure por prestadores aqui'}</PageTitle>
        {hasHouse && <ProvidersList />}
        {!isKeyboardVisible && !hasHouse && (
          <MessageWarning
            title={'Você ainda não possui residência!'}
            text={
              'Adicione uma residência para começar a buscar os serviços disponíveis.'
            }
            buttonText={'Adicionar residência'}
            navigateTo={'AddHouse'}
          />
        )}
        {isKeyboardVisible && hasHouse && (
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
