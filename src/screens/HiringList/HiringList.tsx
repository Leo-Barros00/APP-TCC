import ContractService from '@Api/services/contractService'
import InfoCardIcon from '@Components/atomic/InfoCardIcon/InfoCardIcon'
import TextButton from '@Components/atomic/TextButton/TextButton'
import { useAppDispatch } from '@Hooks/redux'
import { setSelectedProviderId } from '@Store/reducers/avaliation'
import { IContract } from '@Typings/contract'
import { FontAwesome5, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native'
import { ContractorContractState } from '@Store/reducers/user'
import { addHours, isBefore } from 'date-fns'

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  padding: 16px;
`

const ScreenTitle = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  margin-bottom: 32px;
`

const EmptyListText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.primary.main};
`

const EmptyListView = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: 240px;
`

const HiringList: React.FC = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [contracts, setContracts] = useState<IContract[]>([])

  async function getAllContractsByContractorId() {
    const contractsSearched: IContract[] = await ContractService.getContractByContractor()
    setContracts(contractsSearched)
  }

  useEffect(() => {
    getAllContractsByContractorId()
  }, [])

  function isContractReportable(contract: IContract) {
    const now = new Date()
    const startDate = new Date(contract.startDate)

    return contract.progressStatus === 'pending' && isBefore(startDate, addHours(now, -3));
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenTitle>Aqui está o histórico das suas contratações!</ScreenTitle>
        <FlatList
          style={{ width: '100%', marginBottom: 120 }}
          data={contracts}
          ListEmptyComponent={() => (
            <EmptyListView>
              <LottieView
                style={{ height: 120, width: 120 }}
                source={require('../../../assets/lottie/empty-list.json')}
                autoPlay
                loop={true}
              />
              <EmptyListText>{'Você não possui contratações!'}</EmptyListText>
            </EmptyListView>
          )}
          renderItem={({ item }) => (
            <InfoCardIcon
              title={item.provider.name + ' ' + item.provider.surname}
              subtitle={item.description}
              size={item.value + '$'}
              icon={<FontAwesome5 name="file-contract" size={24} color="black" />}
              secondIcon={<SimpleLineIcons name="star" size={24} color="black" />}
              thirdIcon={isContractReportable(item) && <AntDesign name="warning" size={24} color="black" />}
              bgColor={false}
              onPress={() => {
                dispatch(setSelectedProviderId(item.provider.id))
                navigation.navigate('Rating')
              }}
              onPressThirdIcon={() => navigation.navigate('Report', { contract: item } as never)}
            />
          )}
        />

        <View style={{ width: '100%', position: 'absolute', bottom: 16 }}>
          <TextButton
            text="Voltar"
            variant="primary"
            onPress={() => navigation.goBack()}
          />
        </View>
      </Container>
    </SafeAreaView>
  )
}

export default HiringList
