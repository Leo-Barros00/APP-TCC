import React, { useCallback, useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'
import { useAppSelector } from '@Hooks/redux'
import styled from 'styled-components/native'
import { Animated, Easing, FlatList } from 'react-native'
import ContractCard from '@Components/atomic/ContractCard/ContractCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContractService from '@Api/services/contractService'
import LottieView from 'lottie-react-native'
import { formatServiceValueToString } from '@Utils/serviceValue'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`

const SafeAreaContainerLoading = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
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

const ProposalsScreen = () => {
  const { preferenceId } = useAppSelector(({ user }) => user)
  const [contracts, setContracts] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)

  async function getContracts() {
    const contractsSearched: any[] = await ContractService.getContracts()
    const filteredContracts = contractsSearched
      .filter((contract) => contract.accepted === null)
      .sort((a, b) => b.date - a.date.get)
    setContracts(filteredContracts)
    setLoading(false)
  }

  async function handleOnPressAcceptOrDecline(id: string, status: string) {
    await ContractService.updateContractStatus(id, status)
    const newArray = contracts!.filter((contract) => contract.id !== id)
    setTimeout(() => {
      setContracts(newArray)
    }, 1000)
  }

  useEffect(() => {
    getContracts()
  }, [])

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

  if (loading) {
    return (
      <SafeAreaContainerLoading>
        <Title>Suas propostas de serviço</Title>
        <LottieView
          style={{ height: 120, width: 120 }}
          source={require('./loading_dots_animation.json')}
          autoPlay
          loop={true}
        />
      </SafeAreaContainerLoading>
    )
  }
  return (
    <SafeAreaContainer>
      <Title>Suas propostas de serviço</Title>
      <ProposalsContainer>
        <FlatList
          style={{ paddingHorizontal: 16 }}
          data={contracts!}
          // extraData={contracts}
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
              onPressAccept={() => {
                handleOnPressAcceptOrDecline(item.id, 'true')
              }}
              onPressDecline={() => {
                handleOnPressAcceptOrDecline(item.id, 'false')
              }}
            />
          )}
        />
      </ProposalsContainer>
    </SafeAreaContainer>
  )
}

export default ProposalsScreen
