import styled, { useTheme } from 'styled-components/native'
import { ICalendar } from './ICalendar'
import { FlatList } from 'react-native'
import { getDateString, getTimeString } from '@Utils/date'
import { useEffect, useState } from 'react'
import IconButton from '../IconButton'
import { AntDesign } from '@expo/vector-icons'
import { formatServiceValueToString } from '@Utils/serviceValue'

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

const HourText = styled.Text`
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

const DayText = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-Bold';
  text-align: center;
  color: ${({ theme }) => theme.colors.primary.main};
`

const Calendar: React.FC<ICalendar> = ({ contracts }) => {
  const theme = useTheme()

  const [daysOfCalendar, setDaysOfCalendar] = useState<string[]>([])
  const [daysCarouselCont, setDaysCarouselCont] = useState<number>(0)

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

  useEffect(() => {
    getDaysOfCalendar()
  }, [])

  return (
    <Container>
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
        <DayText>{daysOfCalendar[daysCarouselCont]}</DayText>
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
            <ContractContainer>
              <HourText>{getTimeString(new Date(item.startDate))}</HourText>
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
