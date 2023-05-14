import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
