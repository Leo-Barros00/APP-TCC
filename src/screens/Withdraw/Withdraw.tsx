import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { formatServiceValueToString } from '@Utils/serviceValue'
import TextButton from '@Components/atomic/TextButton'
import TextField from '@Components/atomic/TextField'
import Toast from 'react-native-root-toast'
import WithdrawService from '@Api/services/withdrawService'
import { insertLoggedUserInfo } from '@Store/reducers/user'
import TransitionScreen from '@Components/atomic/TransitionScreen'
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
  gap: 8px;
`

const BalanceText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-Medium';
  text-align: center;
`

const BalanceValueText = styled(BalanceText)`
  font-size: 18px;
  font-family: 'Poppins-Bold';
`

const ButtonsContainer = styled.View`
  
`

const WithdrawTextField = styled(TextField)`
  background-color: #fff;
  text-align: right;
`

const convertToNumber = (formattedValue: string): number => {
  let numberString = formattedValue.replace(/[^\d,]/g, '');
  numberString = numberString.replace(',', '.');
  const numberValue = parseFloat(numberString);

  return numberValue;
};

const formatCurrency = (text: string) => {
  const cleaned = text.replace(/\D/g, '');
  const number = parseInt(cleaned, 10) / 100;

  if (isNaN(number))
    return ''

  const currency = number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return currency.trim()
};

const toastDefaultConfig = {
  duration: Toast.durations.LONG,
  position: Toast.positions.CENTER,
  shadow: true,
  animation: true,
  hideOnPress: true,
}

const Withdraw = () => {
  const { balance } = useAppSelector(({ user }) => user)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const [withdrawValue, setWithdrawValue] = useState('')
  const [finished, setFinished] = useState(false)

  function handleOnClickWithdrawButton() {
    const numberValue = convertToNumber(withdrawValue)
    if (numberValue > balance) {
      return Toast.show('O valor inserido é maior que o valor disponível.', toastDefaultConfig)
    }

    WithdrawService.withdrawValue(numberValue)
      .then((res) => {
        setFinished(true)
        dispatch(insertLoggedUserInfo(res))
      })
      .catch(() => {
        return Toast.show('Ocorreu um erro ao realizar o saque, tente novamente mais tarde.', toastDefaultConfig)
      })
  }

  function handleOnChangeWithdrawValue(value: string) {
    const formattedText = formatCurrency(value);
    setWithdrawValue(formattedText);
  }

  if (finished) {
    return (
      <TransitionScreen
        message="Saque realizado com sucesso!"
        navigatesTo={() => {
          navigation.goBack()
        }}
      />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenTitle>Realizar Saque</ScreenTitle>
        <InfoContainer>
          <BalanceText>
            Insira o valor que deseja sacar
          </BalanceText>
          <BalanceValueText>
            Máximo: {formatServiceValueToString(balance)}
          </BalanceValueText>
          <WithdrawTextField
            variant='primary'
            keyboardType='numeric'
            onChangeText={handleOnChangeWithdrawValue}
            value={withdrawValue}
            autoFocus
          />
        </InfoContainer>
        <ButtonsContainer>
          <TextButton
            text='Sacar'
            variant='primary'
            onPress={handleOnClickWithdrawButton}
          />
        </ButtonsContainer>
      </Container>
    </SafeAreaView>
  )
}

export default Withdraw