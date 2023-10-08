import React from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppSelector } from '@Hooks/redux'
import { useNavigation } from '@react-navigation/native'
import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'
import ServicesList from '@Components/atomic/ServicesList'

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`

const PageTitle = styled.Text`
  font-size: 28px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const SearchServices: React.FC = () => {
  const { houses } = useAppSelector(({ user }) => user)

  const hasHouse = houses.length > 0

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <PageTitle>Procure por prestadores</PageTitle>
        {!hasHouse ? (
          <MessageWarning
            title={'Você ainda não possui residência!'}
            text={
              'Adicione uma residência para começar a buscar os serviços disponíveis.'
            }
            buttonText={'Adicionar residência'}
            navigateTo={'AddHouse'}
          />
        ) : (
          <>
            <ServicesList />
          </>
        )}
      </Container>
    </SafeAreaView>
  )
}

export default SearchServices
