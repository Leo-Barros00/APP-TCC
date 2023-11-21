import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useAppSelector } from '@Hooks/redux'
import { formatServiceValueToString } from '@Utils/serviceValue'
import TextButton from '@Components/atomic/TextButton'
import { useNavigation } from '@react-navigation/native'

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 16px;
`

const ScreenTitle = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  margin-bottom: 32px;
`

const InfoContainer = styled.View`
  background-color: #ddd;
  border-radius: 16px;
  padding: 16px;
  font-size: 22px;
  gap: 16px;
`

const BalanceText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-Medium';
  text-align: center;
`

const BalanceValueText = styled(BalanceText)`
  font-size: 32px;
  font-family: 'Poppins-Bold';
`

const ButtonsContainer = styled.View`
  
`

const Balance = () => {
  const navigation = useNavigation()
  const { balance } = useAppSelector(({ user }) => user)

  function handleOnClickWithdrawButton() {
    navigation.navigate('Withdraw')
  }

  function handleOnClickWithdrawHistoryButton() {
    navigation.navigate('WithdrawHistory')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenTitle>Carteira</ScreenTitle>
        <InfoContainer>
          <BalanceText>
            Seu saldo atual é de:
          </BalanceText>
          <BalanceValueText>
            {formatServiceValueToString(balance)}
          </BalanceValueText>
        </InfoContainer>
        <ButtonsContainer>
          <TextButton
            text='Histórico de saques'
            variant='primary'
            onPress={handleOnClickWithdrawHistoryButton}
          />
          <TextButton
            text='Realizar saque'
            variant='primary'
            onPress={handleOnClickWithdrawButton}
          />
        </ButtonsContainer>
      </Container>
    </SafeAreaView>
  )
}

export default Balance