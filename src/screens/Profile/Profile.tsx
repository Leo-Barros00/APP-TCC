import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

import TextButton from '@Components/atomic/TextButton/TextButton'
import { useAppDispatch } from '@Hooks/redux'
import { reset } from '@Store/reducers/auth'
import { deleteSecureStoreValue } from '@Utils/secureStore'

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: space-between;
`

const BodyContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 16px;
`

const Profile: React.FC = () => {
  const dispatch = useAppDispatch()

  function handleOnPressLogoutButton() {
    dispatch(reset())
    deleteSecureStoreValue('secureToken')
  }

  return (
    <Container>
      <SafeAreaView>
        <BodyContainer>
          <Text>Profile</Text>
          <TextButton text="Sair" variant="primary" onPress={handleOnPressLogoutButton} />
        </BodyContainer>
      </SafeAreaView>
    </Container>
  )
}

export default Profile
