import styled, { useTheme } from 'styled-components/native'
import { ICalendar } from './ICalendar'
import { FlatList, Linking, View } from 'react-native'
import { getDateString, getTimeString } from '@Utils/date'
import { useEffect, useState } from 'react'
import IconButton from '../IconButton'
import { AntDesign } from '@expo/vector-icons'
import { formatServiceValueToString } from '@Utils/serviceValue'
import Modal from '../Modal'
import { IContract } from '@Typings/contract'
import { EvilIcons } from '@expo/vector-icons'
import TextButton from '../TextButton'
import { FontAwesome } from '@expo/vector-icons'

const Container = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
  padding: 12px;
  width: 100%;
`

const CalendarItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-left: 12px;
  padding: 12px;
  gap: 18px;
`

const ContractContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors['primary']['main']}33;
  gap: 32px;
`

const DayContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-bottom: 12px;
  gap: 28px;
`

const ServiceLeftInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ServiceRightInfo = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  padding-right: 4px;
  width: 160px;
`

const ServiceInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
`
const ModalContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 330px;
`
const TopicText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const InfoText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const LinkText = styled.Text`
  text-decoration: underline;
  font-size: 18px;
  font-family: 'Poppins-Regular';
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const TitleText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-Bold';
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const Calendar: React.FC<ICalendar> = ({ contracts }) => {
  const theme = useTheme()

  const [daysOfCalendar, setDaysOfCalendar] = useState<string[]>([])
  const [daysCarouselCont, setDaysCarouselCont] = useState<number>(0)
  const [selectedService, setSelectedService] = useState<IContract | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  function getDaysOfCalendar() {
    if (contracts !== null && contracts.length != 0) {
      const daysOfContracts = contracts
        .filter((value, index, array) => array.indexOf(value) === index)
        .map((c) => getDateString(new Date(c.startDate), false))

      let uniqueDaysOfContracts: string[] = Array.from(new Set(daysOfContracts))
      setDaysOfCalendar(uniqueDaysOfContracts)
    }
  }

  function onPressLeftCarousel() {
    if (daysCarouselCont !== 0) setDaysCarouselCont(daysCarouselCont - 1)
  }

  function onPressRightCarousel() {
    if (daysCarouselCont !== daysOfCalendar.length - 1)
      setDaysCarouselCont(daysCarouselCont + 1)
  }

  function onPressService(service: IContract) {
    setIsModalVisible(true)
    setSelectedService(service)
  }

  function isServiceAvailable(service: IContract | null) {
    if (!service) {
      return false
    }
    const now = new Date()
    const startDate = new Date(service.startDate)
    const endDate = new Date(service.endDate)
    return (
      startDate.getFullYear() === now.getFullYear() &&
      startDate.getMonth() === now.getMonth() &&
      startDate.getDate() === now.getDate() &&
      now.getHours() >= startDate.getHours() &&
      now.getHours() <= endDate.getHours()
    )
  }

  useEffect(() => {
    getDaysOfCalendar()
  }, [])

  return (
    <Container>
      <Modal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={'Sobre o serviço:'}
      >
        <ModalContentContainer>
          <View>
            <ServiceInfoContainer>
              <TopicText>Contratante:</TopicText>
              <InfoText>
                {selectedService?.contractor.name} {selectedService?.contractor.surname}
              </InfoText>
            </ServiceInfoContainer>
            <ServiceInfoContainer>
              <TopicText>Descrição:</TopicText>
              <InfoText>{selectedService?.description}</InfoText>
            </ServiceInfoContainer>
            <ServiceInfoContainer>
              <TopicText>Horário:</TopicText>
              <InfoText>
                {selectedService
                  ? getTimeString(new Date(selectedService?.startDate))
                  : '--:--'}{' '}
                -{' '}
                {selectedService
                  ? getTimeString(new Date(selectedService?.endDate))
                  : '--:--'}
              </InfoText>
            </ServiceInfoContainer>
            <ServiceInfoContainer>
              <TopicText>Tempo de serviço:</TopicText>
              <InfoText>{selectedService?.workHours} horas</InfoText>
            </ServiceInfoContainer>
            <ServiceInfoContainer>
              <TopicText>Valor:</TopicText>
              <InfoText>
                {formatServiceValueToString(Number(selectedService?.value))}
              </InfoText>
            </ServiceInfoContainer>
            <ServiceInfoContainer>
              <TopicText>Endereço:</TopicText>
              <LinkText
                onPress={() => {
                  const query = encodeURIComponent(
                    `${selectedService?.house.address.description} ${selectedService?.house.address.number}`
                  )
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${query}`
                  )
                }}
              >
                {selectedService?.house.address.description},{' '}
                {selectedService?.house.address.number}
              </LinkText>
              <EvilIcons
                name="external-link"
                size={24}
                color={theme.colors['primary']['main']}
              />
            </ServiceInfoContainer>
          </View>
          {isServiceAvailable(selectedService) ? (
            <TextButton text={'Começar'} variant={'primary'} />
          ) : (
            <TextButton
              text={'Começar'}
              variant={'primary'}
              ghost
              icon={
                <FontAwesome
                  name="lock"
                  size={24}
                  color={theme.colors['primary']['main']}
                />
              }
            />
          )}
        </ModalContentContainer>
      </Modal>

      <DayContainer>
        <IconButton
          icon={
            <AntDesign
              name="leftcircle"
              size={32}
              color={
                daysCarouselCont === 0
                  ? `${theme.colors['secondary']['main']}33`
                  : theme.colors['primary']['main']
              }
            />
          }
          size={32}
          onPress={onPressLeftCarousel}
          disabled={daysCarouselCont === 0}
        />
        <TitleText>{daysOfCalendar[daysCarouselCont]}</TitleText>
        <IconButton
          icon={
            <AntDesign
              name="rightcircle"
              size={32}
              color={
                daysCarouselCont === daysOfCalendar.length - 1
                  ? `${theme.colors['secondary']['main']}33`
                  : theme.colors['primary']['main']
              }
            />
          }
          size={32}
          onPress={onPressRightCarousel}
          disabled={daysCarouselCont === daysOfCalendar.length - 1}
        />
      </DayContainer>
      <FlatList
        data={contracts?.filter(
          (contract) =>
            getDateString(new Date(contract.startDate), false) ===
            daysOfCalendar[daysCarouselCont]
        )}
        renderItem={({ item }) => (
          <>
            <ContractContainer onPress={() => onPressService(item)}>
              <TopicText>{getTimeString(new Date(item.startDate))}</TopicText>
              <CalendarItemContainer>
                <ServiceLeftInfo>
                  <InfoText>{`${item.workHours}h`}</InfoText>
                  <InfoText>{formatServiceValueToString(Number(item.value))}</InfoText>
                </ServiceLeftInfo>
                <ServiceRightInfo>
                  <InfoText numberOfLines={2} ellipsizeMode="tail">
                    {item.description}
                  </InfoText>
                </ServiceRightInfo>
              </CalendarItemContainer>
            </ContractContainer>
          </>
        )}
      />
    </Container>
  )
}

export default Calendar
