import React, { useEffect } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import UserService from '@Api/services/userService'
import { insertLoggedUserInfo } from '@Store/reducers/user'
import { insertAuthInfo } from '@Store/reducers/auth'
import { secureStoreSave } from '@Utils/secureStore'

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

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { token, refreshToken } = useAppSelector(({ auth }) => auth)

  async function loadLoggedUser() {
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
    }, 600000)
  }

  useEffect(() => {
    loadLoggedUser()
  }, [])

  return (
    <Container>
      <SafeAreaView>
        <BodyContainer>
          <Text>HOME</Text>
        </BodyContainer>
      </SafeAreaView>
    </Container>
  )
}

export default Home
