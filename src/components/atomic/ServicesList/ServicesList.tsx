import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import {
  insertProviders,
  setSelectedHouse,
  setServiceHours,
  setStartDate,
} from '@Store/reducers/services'
import SelectHouseButton from '../SelectHouseButton/SelectHouseButton'
import LottieView from 'lottie-react-native'
import SelectHouseList from '../SelectHouseList/SelectHouseList'
import ProviderService from '@Api/services/providerService'
import ProvidersList from '@Screens/SearchServices/components/ProvidersList'
import IconButton from '../IconButton'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { getDateString, getTimeString, mergeDateAndTime } from '@Utils/date'
import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Select from '@Components/atomic/Select'

const SafeAreaContainer = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  padding: 0 16px;
  align-items: center;
`

const HeaderContainer = styled.View`
  margin-top: 12px;
  flex-direction: row;
  padding-left: 12px;
  padding-right: 12px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #737373;
  flex-direction: column;
  padding-bottom: 16px;
`

const DateText = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
  color: black;
`

const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 36px;
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
`

const DatePressContainer = styled.TouchableOpacity``

const ServicesList = () => {
  const {
    services: { houseSelected, providers, serviceHours, startDate },
  } = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [datePicked, setDatePicked] = useState<Date | null>(null)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [timePicked, setTimePicked] = useState<Date | null>(null)
  const [selectedServiceHours, setSelectedServiceHours] = useState<string>('')

  function handleOnChangeTimePicker({ type }: DateTimePickerEvent, time?: Date) {
    setShowTimePicker(false)
    time!.setHours(time!.getHours() - 3)
    setTimePicked(time!)
  }

  function handleOnChangeDatePicker({ type }: DateTimePickerEvent, date?: Date) {
    setShowDatePicker(false)
    setDatePicked(date!)
  }

  function handleOnPressDateField() {
    setShowDatePicker(true)
  }

  function handleOnPressTimeField() {
    setShowTimePicker(true)
  }

  function handleOnPressSelectHouse() {
    setIsSelectOpen((prevState) => !prevState)
  }

  function handleOnPressHouseItem(houseId: string) {
    setIsSelectOpen(false)
    dispatch(setSelectedHouse(houseId))
  }

  useEffect(() => {
    async function getProviders() {
      if (
        houseSelected === null ||
        datePicked === null ||
        timePicked === null ||
        selectedServiceHours === null
      )
        return

      const startDate = mergeDateAndTime(datePicked, timePicked)
      dispatch(setServiceHours(selectedServiceHours))
      dispatch(setStartDate(startDate.toISOString()))

      const response = await ProviderService.getProvidersByHouse(
        houseSelected,
        startDate,
        selectedServiceHours
      )
      dispatch(insertProviders(response.providers))
    }

    getProviders()
  }, [houseSelected, datePicked, timePicked, selectedServiceHours])

  return (
    <SafeAreaContainer>
      <HeaderContainer>
        <SelectHouseButton onPress={handleOnPressSelectHouse} />
        <Select
          isButton={false}
          title={'Selecione o tempo de serviço'}
          options={[
            { id: '4', value: '4 horas' },
            { id: '6', value: '6 horas' },
            { id: '8', value: '8 horas' },
          ]}
          selectedOption={selectedServiceHours}
          onSelect={(opt) => setSelectedServiceHours(opt)}
        />
        <View style={{ flexDirection: 'row', gap: 16 }}>
          {!datePicked ? (
            <IconButton
              size={32}
              icon={<MaterialIcons name="date-range" size={32} color="black" />}
              onPress={handleOnPressDateField}
            />
          ) : (
            <DatePressContainer onPress={() => setShowDatePicker(true)}>
              <DateContainer>
                <DateText>{getDateString(datePicked)}</DateText>
              </DateContainer>
            </DatePressContainer>
          )}
          {!timePicked ? (
            <IconButton
              size={32}
              icon={<Feather name="clock" size={32} color="black" />}
              onPress={handleOnPressTimeField}
            />
          ) : (
            <DatePressContainer onPress={() => setShowTimePicker(true)}>
              <DateContainer>
                <DateText>{getTimeString(timePicked)}</DateText>
              </DateContainer>
            </DatePressContainer>
          )}
        </View>
      </HeaderContainer>

      {isSelectOpen && <SelectHouseList onPress={handleOnPressHouseItem} />}

      {showDatePicker && (
        <DateTimePicker
          value={datePicked ? datePicked : new Date()}
          mode="date"
          minimumDate={new Date()}
          onChange={handleOnChangeDatePicker}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={timePicked ? timePicked : new Date()}
          mode="time"
          minimumDate={new Date()}
          onChange={handleOnChangeTimePicker}
        />
      )}
      {houseSelected ? (
        providers === null ? (
          <LottieView
            style={{ height: 120, width: 120 }}
            source={require('./loading_dots_animation.json')}
            autoPlay
            loop={true}
          />
        ) : (
          <ProvidersList />
        )
      ) : (
        <></>
      )}
    </SafeAreaContainer>
  )
}

export default ServicesList
