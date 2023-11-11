import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import MessageWarning from '@Components/atomic/MessageWarning/MessageWarning'
import { useAppSelector } from '@Hooks/redux'
import styled from 'styled-components/native'
import { FlatList, View } from 'react-native'
import ContractCard from '@Components/atomic/ContractCard/ContractCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import ContractService from '@Api/services/contractService'
import LottieView from 'lottie-react-native'
import { formatServiceValueToString } from '@Utils/serviceValue'
import TextButton from '@Components/atomic/TextButton'
import Calendar from '@Components/atomic/Calendar'
import { IContract } from '@Typings/contract'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
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

const EmptyListView = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 240px;
`

const EmptyListText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.primary.main};
`

const ProposalsScreen = () => {
  const { preferenceId } = useAppSelector(({ user }) => user)
  const [contracts, setContracts] = useState<any[] | null>(null)
  const [acceptedContracts, setAcceptedContracts] = useState<IContract[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCalendarScreen, setIsCalendarScreen] = useState(false)

  async function getContracts() {
    const contractsSearched: IContract[] = await ContractService.getContracts()
    const filteredContracts = contractsSearched
      .filter((contract) => contract.accepted === null)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    setContracts(filteredContracts)
    setLoading(false)
  }

  async function geAcceptedtContracts() {
    const contractsSearched: IContract[] = await ContractService.getContracts()
    const filteredContracts = contractsSearched
      .filter((contract) => contract.accepted)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    setAcceptedContracts(filteredContracts)
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

  useEffect(() => {
    geAcceptedtContracts()
  }, [isCalendarScreen])

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
          source={require('../../../assets/lottie/loading_dots_animation.json')}
          autoPlay
          loop={true}
        />
      </SafeAreaContainerLoading>
    )
  }

  return (
    <SafeAreaContainer>
      <Title>Suas propostas de serviço</Title>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          marginHorizontal: 12,
          marginBottom: 12,
        }}
      >
        <TextButton
          text={'Pendentes'}
          variant={'primary'}
          fluid
          ghost={isCalendarScreen}
          onPress={() => {
            setIsCalendarScreen(false)
          }}
        />
        <TextButton
          text={'Agenda'}
          variant={'primary'}
          fluid
          ghost={!isCalendarScreen}
          onPress={() => setIsCalendarScreen(true)}
        />
      </View>
      {isCalendarScreen ? (
        <View style={{ flex: 1, width: '100%' }}>
          <Calendar contracts={contracts !== null ? acceptedContracts : []} />
        </View>
      ) : (
        <ProposalsContainer>
          <FlatList
            style={{ paddingHorizontal: 16 }}
            data={contracts!}
            ListEmptyComponent={() => (
              <EmptyListView>
                <LottieView
                  style={{ height: 120, width: 120 }}
                  source={require('../../../assets/lottie/empty-list.json')}
                  autoPlay
                  loop={true}
                />
                <EmptyListText>
                  {'Você ainda não possui nenhuma proposta de serviço!'}
                </EmptyListText>
              </EmptyListView>
            )}
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
                date={new Date(item.startDate)}
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
      )}
    </SafeAreaContainer>
  )
}

export default ProposalsScreen
