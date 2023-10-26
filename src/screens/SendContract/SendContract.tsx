import TextButton from '@Components/atomic/TextButton/TextButton'
import { useAppSelector } from '@Hooks/redux'
import { formatServiceValueToString } from '@Utils/serviceValue'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Contract } from 'src/typings'
import ContractService from '@Api/services/contractService'
import { getDateString, getTimeString } from '@Utils/date'
import SignUpErrors from '@Components/signUp/SignUpErrors/SignUpErrors'
import TransitionScreen from '@Components/atomic/TransitionScreen/TransitionScreen'
import React from 'react'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
`

const Container = styled.ScrollView`
  padding: 24px;
  width: 100%;
  padding: 16px;
`

const ButtonsInlineContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`

const FormContainer = styled.View`
  width: 100%;
`

const InfoContainer = styled.View`
  width: 100%;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors['primary']['main']};
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  margin-top: 16px;
`

const InfoItemsContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  margin-bottom: 8px;
`

const PageTitle = styled.Text`
  font-size: 28px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const Title = styled.Text`
  font-size: 20px;
  line-height: 32px;
  font-family: 'Poppins-SemiBold';
  text-align: left;
`

const Description = styled.Text`
  font-size: 20px;
  line-height: 32px;
  font-family: 'Poppins-Regular';
  text-align: left;
`

const Divider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors['primary']['main']};
  opacity: 0.8;
  margin-top: 8px;
  margin-bottom: 16px;
`

const DescriptionField = styled.TextInput`
  font-size: 20px;
  line-height: 32px;
  font-family: 'Poppins-Regular';
  text-align: left;
`

const DateText = styled.Text`
  font-size: 20px;
  line-height: 32px;
  font-family: 'Poppins-Regular';
  text-align: left;
  color: black;
`

const FormButton = styled(TextButton)`
  flex: 1;
`

const SendContract = () => {
  const { providers, providerIndexSelected, houseSelected } = useAppSelector(
    ({ services }) => services
  )
  const { houses } = useAppSelector(({ user }) => user)
  const { startDate, serviceHours } = useAppSelector(({ services }) => services)
  const navigation = useNavigation()
  const provider = providers![providerIndexSelected!]
  const userHouseSelected = houses.filter((item) => item.id === houseSelected)[0]
  const [description, setDescription] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const [finished, setFinished] = useState(false)
  const [totalValue, setTotalValue] = useState<number>(0)

  async function handleOnPressSendContract() {
    if (!description || !startDate || !serviceHours)
      setErrors(['Preencha todos os campos!'])
    else {
      setErrors([])
      const contract: Contract = {
        value: totalValue,
        date: new Date(startDate!),
        description: description,
        houseId: userHouseSelected.id,
        providerId: provider.id,
        workHours: Number(serviceHours),
      }

      await ContractService.sendContract(contract)
      setFinished(true)
    }
  }

  function navigateToHome() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', params: { screen: 'SearchServices' } }],
    })
  }

  if (finished) {
    return (
      <TransitionScreen
        message="Solicitação de serviço realizada com sucesso!"
        navigatesTo={navigateToHome}
      />
    )
  }

  useEffect(() => {
    switch (serviceHours) {
      case '4':
        setTotalValue(provider.preference.priceFourHours)
        break
      case '6':
        setTotalValue(provider.preference.priceSixHours)
        break
      case '8':
        setTotalValue(provider.preference.priceEightHours)
        break
    }
  }, [])

  return (
    <SafeAreaContainer>
      <Container>
        <FormContainer>
          <PageTitle>Envio de proposta</PageTitle>
          <InfoContainer>
            <InfoItemsContainer>
              <Title>{'Prestador:'}</Title>
              <Description>{provider.name + ' ' + provider.surname}</Description>
            </InfoItemsContainer>
            <InfoItemsContainer>
              <Title>{'Nota:'}</Title>
              <Description>{'4.3'}</Description>
            </InfoItemsContainer>
            <InfoItemsContainer>
              <Title>{'Endereço:'}</Title>
              <Description>
                {userHouseSelected.address.description +
                  ', ' +
                  userHouseSelected.address.number +
                  '\n' +
                  userHouseSelected.address.neighborhood.name}
              </Description>
            </InfoItemsContainer>
            <InfoItemsContainer>
              <Title>{'Cidade/UF:'}</Title>
              <Description>
                {userHouseSelected.address.neighborhood.city.name +
                  ' - ' +
                  userHouseSelected.address.neighborhood.city.state.uf}
              </Description>
            </InfoItemsContainer>
            <InfoItemsContainer>
              <Title>{'Metragem da casa:'}</Title>
              <Description>{userHouseSelected.metersBuilt + ' m²'}</Description>
            </InfoItemsContainer>

            <InfoItemsContainer>
              <Title>{'Data:'}</Title>
              <DateText>{getDateString(new Date(startDate!))}</DateText>
            </InfoItemsContainer>

            <InfoItemsContainer>
              <Title>{'Hora de Início:'}</Title>
              <DateText>{getTimeString(new Date(startDate!))}</DateText>
            </InfoItemsContainer>

            <InfoItemsContainer>
              <Title>{'Horas de serviço:'}</Title>
              <DateText>{serviceHours}</DateText>
            </InfoItemsContainer>

            <InfoItemsContainer>
              <Title>{'Descrição:'}</Title>
              <View style={{ flex: 1 }}>
                <DescriptionField
                  multiline
                  onChangeText={setDescription}
                  value={description}
                  placeholder="Limpar e passar roupas..."
                />
              </View>
            </InfoItemsContainer>
            <Divider />
            <InfoItemsContainer>
              <Title>{'Valor total:'}</Title>
              <Description>
                {serviceHours !== ''
                  ? formatServiceValueToString(totalValue)
                  : 'Selecione um tempo de serviço...'}
              </Description>
            </InfoItemsContainer>
          </InfoContainer>
        </FormContainer>
        <SignUpErrors errors={errors} />
        <ButtonsInlineContainer>
          <FormButton
            text={'Cancelar'}
            variant={'primary'}
            onPress={navigation.goBack}
            ghost
          />
          <FormButton
            text={'Enviar'}
            variant={'primary'}
            onPress={handleOnPressSendContract}
          />
        </ButtonsInlineContainer>
      </Container>
    </SafeAreaContainer>
  )
}

export default SendContract
