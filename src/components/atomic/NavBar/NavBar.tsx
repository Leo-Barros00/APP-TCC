import React from 'react'
import styled from 'styled-components/native'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import NavBarButtonText from '../NavBarButtonText/NavBarButtonText'

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ButtonContainer = styled.TouchableOpacity`
  flex: 1;
  padding: 16px 0;
  align-items: center;
`

const ButtonContent = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavBarItems = [
  {
    screen: 'Proposals',
    label: 'Propostas\nRecebidas',
    icon: <Ionicons name="document-text-outline" size={24} color="black" />,
    selectedIcon: <Ionicons name="document-text" size={24} color="#3030C2" />,
  },
  {
    screen: 'SearchServices',
    label: 'Procurar\nDiaristas',
    icon: <Octicons name="search" size={24} color="black" />,
    selectedIcon: <Octicons name="search" size={24} color="#3030C2" />,
  },
  {
    screen: 'Profile',
    label: 'Perfil',
    icon: <Ionicons name="ios-person-outline" size={24} color="black" />,
    selectedIcon: <Ionicons name="ios-person" size={24} color="#3030C2" />,
  },
]

const NavBar: React.FC<BottomTabBarProps> = ({ navigation }) => {
  const { routeNames, index: routeIndex } = navigation.getState()
  const currentRouteName = routeNames[routeIndex]

  function handleOnPressNavBarItem(screen: string) {
    navigation.navigate(screen)
  }

  return (
    <Container>
      {NavBarItems.map(({ label, screen, icon, selectedIcon }) => {
        const isRouteSelected = currentRouteName === screen
        return (
          <ButtonContainer
            key={screen}
            onPress={() => handleOnPressNavBarItem(screen)}
            disabled={isRouteSelected}
          >
            <ButtonContent>
              {isRouteSelected ? selectedIcon : icon}
              <NavBarButtonText text={label} isRouteSelected={isRouteSelected} />
            </ButtonContent>
          </ButtonContainer>
        )
      })}
    </Container>
  )
}

export default NavBar
