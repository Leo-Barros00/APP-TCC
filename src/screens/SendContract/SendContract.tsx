import TextButton from '@Components/atomic/TextButton/TextButton'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { calculateServiceValue } from '@Utils/serviceValue'
import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import styled, { useTheme } from 'styled-components/native'
import { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
`

const Container = styled.ScrollView`
  padding: 24px;
  width: 100%;
  margin-top: 16px;
`

const ButtonsInlineContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`

const AddText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  color: ${({ theme }) => theme.colors['primary']['main']};
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
  flex-direction: row;
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

const AddButton = styled.TouchableOpacity`
  min-height: 20px;
  padding: 8px 8px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`

const SendContract = () => {
  const { providers, providerIndexSelected, houseSelected } = useAppSelector(
    ({ services }) => services
  )
  const { houses } = useAppSelector(({ user }) => user)
  const navigation = useNavigation()
  const provider = providers![providerIndexSelected!]
  const userHouseSelected = houses.filter((item) => item.id === houseSelected)[0]
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<Date | null>(null)

  function handleOnPressDateField() {
    setShowDatePicker(true)
  }

  function handleOnChangeBirthDate({ type }: DateTimePickerEvent, date?: Date) {
    setShowDatePicker(false)

    if (type === 'set') setErrors([])
    // setDate(date!.toISOString())
    // console.log(date)
    // dispatch()
  }

  function handleOnPressSendContract() {}

  return (
    <SafeAreaContainer>
      <Container>
        <FormContainer>
          <PageTitle>{'Confirmação de proposta'}</PageTitle>
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
              {/* {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={!dateSelected ? new Date() : dateSelected}
                  minimumDate={new Date()}
                  mode="date"
                  is24Hour={true}
                  onChange={handleOnChangeBirthDate}
                />
              )}
              {!showDatePicker && (
                <AddButton onPress={handleOnPressDateField}>
                  <AddText>{dateSelected ? '' : 'Escolha a data aqui'}</AddText>
                </AddButton>
              )} */}
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
                {calculateServiceValue(
                  userHouseSelected.metersBuilt as unknown as number,
                  userHouseSelected.animals
                )}
              </Description>
            </InfoItemsContainer>
          </InfoContainer>
        </FormContainer>
        <ButtonsInlineContainer>
          <TextButton
            text={'Recusar'}
            variant={'primary'}
            onPress={() => {
              navigation.goBack()
            }}
            ghost
            fluid
          />
          <TextButton
            text={'Aceitar'}
            variant={'primary'}
            onPress={handleOnPressSendContract}
            fluid
          />
        </ButtonsInlineContainer>
      </Container>
    </SafeAreaContainer>
  )
}

export default SendContract
