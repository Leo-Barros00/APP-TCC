import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { useAppSelector } from '@Hooks/redux'
import { FlatList } from 'react-native'
import { format } from 'date-fns'

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 16px;
  padding-bottom: 80px;
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

const HistoryText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-Medium';
`

const WithdrawContainer = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`

const formatCurrency = (value: string) => {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const WithdrawHistory = () => {
  const { withdraws } = useAppSelector(({ user }) => user)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ScreenTitle>Histórico de saques</ScreenTitle>
        <InfoContainer>
          <FlatList
            data={withdraws}
            renderItem={({ item }) => (
              <WithdrawContainer>
                <HistoryText>
                  Data: {format(new Date(item.date), 'dd/MM/yyyy')}
                </HistoryText>
                <HistoryText>
                  Hora: {format(new Date(item.date), 'HH:mm:ss')}
                </HistoryText>
                <HistoryText style={{ fontFamily: 'Poppins-Bold' }}>
                  Valor: {formatCurrency(item.value)}
                </HistoryText>
              </WithdrawContainer>
            )}
          />
        </InfoContainer>
      </Container>
    </SafeAreaView>
  )
}

export default WithdrawHistory