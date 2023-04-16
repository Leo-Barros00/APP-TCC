import React, { useState } from 'react'
import { View } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { subYears, isSameDay, format } from 'date-fns'

import TextButton from '@Components/atomic/TextButton'
import SignUpErrors from '@Components/signUp/SignUpErrors'
import SignUpButtons from '@Components/signUp/SignUpButtons'

import { useAppDispatch, useAppSelector } from '@Hooks/redux'
import { insertSignUpInfo, nextStep } from '@Store/reducers/signUp'

const SignUpBirthDateStep = () => {
  const { birthDate } = useAppSelector(({ signUp }) => signUp)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAppDispatch()

  const birthDateParsed = new Date(birthDate)
  const adultDate = subYears(new Date(), 18)
  const dateSelected = !isSameDay(birthDateParsed, adultDate)

  function handleOnPressDateField() {
    setShowDatePicker(true)
  }

  function handleOnChangeBirthDate({ type }: DateTimePickerEvent, date?: Date) {
    setShowDatePicker(false)

    if (type === 'set') setErrors([])
    dispatch(insertSignUpInfo({ birthDate: date?.toISOString() }))
  }

  function handleOnPressNextButton() {
    if (!dateSelected) {
      setErrors(['A data deve ser selecionada'])
    }

    dispatch(nextStep())
  }

  return (
    <View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={birthDateParsed}
          mode="date"
          maximumDate={adultDate}
          is24Hour={true}
          onChange={handleOnChangeBirthDate}
        />
      )}
      <SignUpErrors errors={errors} />
      <TextButton
        text={dateSelected ? format(birthDateParsed, 'dd/MM/yyyy') : 'Selecionar Data'}
        variant="secondary"
        fluid
        onPressIn={handleOnPressDateField}
      />
      <SignUpButtons handleOnPressNextButton={handleOnPressNextButton} />
    </View>
  )
}

export default SignUpBirthDateStep
