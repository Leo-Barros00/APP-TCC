import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'
import { useAppSelector } from '@Hooks/redux'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import ContractCard from '@Components/atomic/ContractCard/ContractCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Contract } from 'src/typings'
import ContractService from '@Api/services/contractService'
import LottieView from 'lottie-react-native'
import { formatServiceValueToString } from '@Utils/serviceValue'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`

const ProposalsContainer = styled.View`
  flex: 1;
`

const Title = styled.Text`
  padding-top: 16px;
  margin-bottom: 32px;
  font-size: 28px;
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
  const [contracts, setContracts] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  async function getContracts() {
    const contracts = await ContractService.getContracts()
    setContracts(contracts)
    console.log(contracts)
    setLoading(false)
  }

  if (!preferenceId) {
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

  useEffect(() => {
    getContracts()
  }, [])

  if (loading) {
    return (
      <LottieView
        style={{ height: 120, width: 120 }}
        source={require('./loading_dots_animation.json')}
        autoPlay
        loop={true}
      />
    )
  }
  return (
    <SafeAreaContainer>
      <Title>Suas propostas de serviço</Title>
      <ProposalsContainer>
        <FlatList
          style={{ paddingHorizontal: 16 }}
          data={contracts!}
          renderItem={({ item }) => (
            <ContractCard
              value={formatServiceValueToString(item.value)}
              icon={<MaterialIcons name="house" size={32} color="black" />}
              houseSize={item.house.metersBuilt.toString()}
              contractorName={item.contractor.name + ' ' + item.contractor.surname}
              jobDescription={item.description}
              locale={
                item.house.address.description +
                ', ' +
                item.house.address.neighborhood.city.name
              }
              date={new Date(item.date)}
            />
          )}
        />
      </ProposalsContainer>
    </SafeAreaContainer>
  )
}

export default ProposalsScreen
