import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { reset as resetAuth } from '@Store/reducers/auth'
import { reset as resetServices } from '@Store/reducers/services'
import { reset as resetSignUp } from '@Store/reducers/signUp'
import { reset as resetUser } from '@Store/reducers/user'
import { deleteSecureStoreValue } from '@Utils/secureStore'
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled, { useTheme } from 'styled-components/native'
import { Foundation } from '@expo/vector-icons'

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`

const HeaderContainer = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').height * 0.3}px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors['primary']['main']};
`

const Avatar = styled.View`
  width: 92px;
  height: 92px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: white;
  margin-bottom: 24px;
`

const BodyContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
`

const AddButton = styled.TouchableOpacity`
  min-height: 20px;
  padding: 8px 8px;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  flex-direction: row;
`

const CardContainer = styled.TouchableOpacity`
  width: 160px;
  height: 160px;
  align-items: flex-start;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  margin: 16px;
`

const StyledText = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';

  color: white;
`
const CardText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';

  color: black;
`

const AddText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';

  padding: 8px 8px;
  color: ${({ theme }) => theme.colors['primary']['main']};
`

const AvatarWords = styled.Text`
  font-size: 36px;
  font-family: 'Poppins-SemiBold';

  padding: 8px;
  color: black;
  text-align: center;
  line-height: 48px;
`

const Profile: React.FC = () => {
  const theme = useTheme()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { name, surname } = useAppSelector(({ user }) => user)

  function resetRedux() {
    dispatch(resetAuth())
    dispatch(resetSignUp())
    dispatch(resetUser())
    dispatch(resetServices())
  }

  function handleOnPressLogoutButton() {
    resetRedux()
    deleteSecureStoreValue('secureToken')
  }

  return (
    <Container>
      <HeaderContainer>
        <Avatar>
          <AvatarWords>
            {name.slice(0, 1).toUpperCase() + surname.slice(0, 1).toUpperCase()}
          </AvatarWords>
        </Avatar>
        <StyledText>{name + ' ' + surname}</StyledText>
      </HeaderContainer>
      <ScrollView>
        <SafeAreaView>
          <BodyContainer>
            <CardContainer onPress={() => navigation.navigate('AddHouse')}>
              <MaterialIcons name="house" size={32} color="black" />
              <CardText>Adicionar residência</CardText>
            </CardContainer>
            <CardContainer onPress={() => navigation.navigate('HouseList')}>
              <FontAwesome5 name="list-ol" size={24} color="black" />
              <CardText>Minhas residências</CardText>
            </CardContainer>
          </BodyContainer>
          <BodyContainer>
            <CardContainer onPress={() => navigation.navigate('Preferences')}>
              <Ionicons name="options" size={24} color="black" />
              <CardText>Minhas preferências</CardText>
            </CardContainer>
            <CardContainer onPress={() => navigation.navigate('HiringList')}>
              <Foundation name="clipboard-pencil" size={24} color="black" />
              <CardText>Minhas contratações</CardText>
            </CardContainer>
          </BodyContainer>
          <BodyContainer>
            <CardContainer onPress={() => navigation.navigate('Balance')}>
              <MaterialIcons name="attach-money" size={24} color="black" />
              <CardText>Carteira</CardText>
            </CardContainer>
          </BodyContainer>
          <AddButton onPress={handleOnPressLogoutButton}>
            <>
              <MaterialIcons
                name="logout"
                size={20}
                color={theme.colors['primary']['main']}
              />
              <AddText>Sair</AddText>
            </>
          </AddButton>
        </SafeAreaView>
      </ScrollView>
    </Container>
  )
}

export default Profile
