import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'
import { useAppSelector } from '@Hooks/redux'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import ContractCard from '@Components/atomic/ContractCard/ContractCard'

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: 24px;
`

const ProposalsContainer = styled.View`
  flex: 1;
`

const Title = styled.Text`
  padding-top: 16px;
  margin-bottom: 32px;
  font-size: 36px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const mockProposals = [
  {
    value: '120',
    meters: 80,
    ratio: 3,
    description: 'Lavar e passar roupas',
    clientName: 'Matheus Guedes',
    neighborhood: 'Cambui',
    city: 'Campinas',
  },
  {
    value: '120',
    meters: 90,
    ratio: 3,
    description: 'Limpeza geral',
    clientName: 'Julia Fernandes',
    neighborhood: 'Cambui',
    city: 'Campinas',
  },
  {
    value: '120',
    meters: 80,
    ratio: 3,
    description: 'Lavar e passar roupas',
    clientName: 'Matheus Guedes',
    neighborhood: 'Cambui',
    city: 'Campinas',
  },
  {
    value: '120',
    meters: 80,
    ratio: 3,
    description: 'Lavar e passar roupas',
    clientName: 'Matheus Guedes',
    neighborhood: 'Cambui',
    city: 'Campinas',
  },
  {
    value: '120',
    meters: 80,
    ratio: 3,
    description: 'Lavar e passar roupas',
    clientName: 'Matheus Guedes',
    neighborhood: 'Cambui',
    city: 'Campinas',
  },
]
const ProposalsScreen = () => {
  const { preferenceId } = useAppSelector(({ user }) => user)

  if (preferenceId) {
    return (
      <SafeAreaContainer>
        <MessageWarning
          title={'Você ainda não selecionou suas preferências!'}
          text={'Selecione suas preferências para começar a receber propostas.'}
          buttonText={'Selecionar Preferências'}
          navigateTo={'Preferences'}
        />
      </SafeAreaContainer>
    )
  }
  return (
    <SafeAreaContainer>
      <Title>{'Suas propostas de serviço:'}</Title>
      <ProposalsContainer>
        <FlatList
          style={{ paddingHorizontal: 16 }}
          data={mockProposals}
          renderItem={({ item }) => (
            <ContractCard
              value={item.value}
              icon={<MaterialIcons name="house" size={32} color="black" />}
              houseSize={item.meters.toString()}
              contractorName={item.clientName}
              jobDescription={item.description}
              locale={item.neighborhood + ', ' + item.city}
            />
          )}
        />
      </ProposalsContainer>
    </SafeAreaContainer>
  )
}

export default ProposalsScreen
